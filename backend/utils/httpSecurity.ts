
/**
 * @fileoverview HTTP security utilities and middleware
 * @description Provides comprehensive HTTP security measures including request validation,
 * response sanitization, and protection against common web vulnerabilities
 */

import { sanitizeString } from './sanitization';

/**
 * Security headers configuration for HTTP responses
 * @constant SECURITY_HEADERS
 */
export const SECURITY_HEADERS = {
  /** Prevents clickjacking attacks */
  'X-Frame-Options': 'DENY',
  /** Prevents MIME type sniffing */
  'X-Content-Type-Options': 'nosniff',
  /** Enables XSS protection in browsers */
  'X-XSS-Protection': '1; mode=block',
  /** Enforces HTTPS connections */
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  /** Controls referrer information */
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  /** Content Security Policy */
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.devnet.solana.com https://api.testnet.solana.com https://api.mainnet-beta.solana.com",
  /** Permissions policy */
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
} as const;

/**
 * Request validation result interface
 */
export interface RequestValidation {
  isValid: boolean;
  errors: string[];
  sanitizedData?: any;
}

/**
 * HTTP request security validator
 */
export class HttpSecurityValidator {
  private static readonly MAX_REQUEST_SIZE = 1024 * 1024; // 1MB
  private static readonly ALLOWED_CONTENT_TYPES = [
    'application/json',
    'application/x-www-form-urlencoded',
    'multipart/form-data'
  ];

  /**
   * Validates HTTP request for security threats
   * @param request - HTTP request object
   * @returns Validation result with sanitized data
   */
  static validateRequest(request: {
    method: string;
    headers: Record<string, string>;
    body?: any;
    url: string;
  }): RequestValidation {
    const errors: string[] = [];
    let sanitizedData: any = {};

    try {
      // Validate request method
      if (!this.isAllowedMethod(request.method)) {
        errors.push(`Method ${request.method} not allowed`);
      }

      // Validate content type
      const contentType = request.headers['content-type'] || '';
      if (request.body && !this.isAllowedContentType(contentType)) {
        errors.push('Invalid content type');
      }

      // Validate request size
      const contentLength = parseInt(request.headers['content-length'] || '0');
      if (contentLength > this.MAX_REQUEST_SIZE) {
        errors.push('Request size exceeds limit');
      }

      // Validate and sanitize URL
      if (!this.isValidUrl(request.url)) {
        errors.push('Invalid URL format');
      }

      // Sanitize request body
      if (request.body) {
        sanitizedData = this.sanitizeRequestBody(request.body);
      }

      // Check for suspicious patterns
      const suspiciousPatterns = this.detectSuspiciousPatterns(request);
      if (suspiciousPatterns.length > 0) {
        errors.push(...suspiciousPatterns);
      }

      return {
        isValid: errors.length === 0,
        errors,
        sanitizedData: errors.length === 0 ? sanitizedData : undefined
      };
    } catch (error) {
      console.error('Request validation failed:', error);
      return {
        isValid: false,
        errors: ['Request validation error']
      };
    }
  }

  /**
   * Checks if HTTP method is allowed
   */
  private static isAllowedMethod(method: string): boolean {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
    return allowedMethods.includes(method.toUpperCase());
  }

  /**
   * Checks if content type is allowed
   */
  private static isAllowedContentType(contentType: string): boolean {
    return this.ALLOWED_CONTENT_TYPES.some(type => 
      contentType.toLowerCase().includes(type)
    );
  }

  /**
   * Validates URL format and checks for malicious patterns
   */
  private static isValidUrl(url: string): boolean {
    try {
      // Check for path traversal attempts
      if (url.includes('../') || url.includes('..\\')) {
        return false;
      }

      // Check for null bytes
      if (url.includes('\0')) {
        return false;
      }

      // Basic URL format validation
      const urlPattern = /^\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*$/;
      return urlPattern.test(url);
    } catch {
      return false;
    }
  }

  /**
   * Sanitizes request body data
   */
  private static sanitizeRequestBody(body: any): any {
    if (typeof body === 'string') {
      return sanitizeString(body, { allowWhitespace: true, maxLength: 10000 });
    }

    if (typeof body === 'object' && body !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(body)) {
        const sanitizedKey = sanitizeString(String(key), { alphanumericOnly: true });
        if (typeof value === 'string') {
          sanitized[sanitizedKey] = sanitizeString(value, { allowWhitespace: true, maxLength: 1000 });
        } else if (typeof value === 'number') {
          sanitized[sanitizedKey] = value;
        } else if (typeof value === 'boolean') {
          sanitized[sanitizedKey] = value;
        } else if (value && typeof value === 'object') {
          sanitized[sanitizedKey] = this.sanitizeRequestBody(value);
        }
      }
      return sanitized;
    }

    return body;
  }

  /**
   * Detects suspicious patterns in request
   */
  private static detectSuspiciousPatterns(request: {
    method: string;
    headers: Record<string, string>;
    body?: any;
    url: string;
  }): string[] {
    const suspiciousPatterns: string[] = [];
    const requestString = JSON.stringify(request).toLowerCase();

    // SQL injection patterns
    const sqlPatterns = [
      'union select', 'drop table', 'insert into', 'delete from',
      'update set', 'exec(', 'execute(', '--', '/*', '*/'
    ];

    // XSS patterns
    const xssPatterns = [
      '<script', 'javascript:', 'onload=', 'onerror=',
      'onclick=', 'onmouseover=', 'eval(', 'alert('
    ];

    // Check for SQL injection
    for (const pattern of sqlPatterns) {
      if (requestString.includes(pattern)) {
        suspiciousPatterns.push(`Potential SQL injection detected: ${pattern}`);
      }
    }

    // Check for XSS
    for (const pattern of xssPatterns) {
      if (requestString.includes(pattern)) {
        suspiciousPatterns.push(`Potential XSS detected: ${pattern}`);
      }
    }

    // Check for excessive request frequency (basic rate limiting check)
    const userAgent = request.headers['user-agent'] || '';
    if (userAgent.length === 0) {
      suspiciousPatterns.push('Missing User-Agent header');
    }

    return suspiciousPatterns;
  }
}

/**
 * Applies security headers to HTTP response
 * @param headers - Existing response headers
 * @returns Headers with security measures applied
 */
export const applySecurityHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
  return {
    ...headers,
    ...SECURITY_HEADERS
  };
};

/**
 * Validates CORS origin against whitelist
 * @param origin - Request origin
 * @param allowedOrigins - List of allowed origins
 * @returns Whether origin is allowed
 */
export const validateCorsOrigin = (origin: string, allowedOrigins: string[]): boolean => {
  if (!origin) return false;
  
  // Allow localhost for development
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return true;
  }

  return allowedOrigins.includes(origin);
};

/**
 * Generates CSRF token for request validation
 * @returns Secure CSRF token
 */
export const generateCsrfToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/**
 * Validates CSRF token
 * @param token - Token to validate
 * @param expectedToken - Expected token value
 * @returns Whether token is valid
 */
export const validateCsrfToken = (token: string, expectedToken: string): boolean => {
  if (!token || !expectedToken) return false;
  return token === expectedToken;
};

/**
 * Sanitizes HTTP response data
 * @param data - Response data to sanitize
 * @returns Sanitized response data
 */
export const sanitizeResponse = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeString(data, { allowWhitespace: true });
  }

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(item => sanitizeResponse(item));
    }

    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeResponse(value);
    }
    return sanitized;
  }

  return data;
};
