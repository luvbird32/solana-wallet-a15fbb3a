
/**
 * @fileoverview Security middleware for HTTP request processing
 * @description Provides middleware functions for request validation, rate limiting,
 * and security header application
 */

import { HttpSecurityValidator, applySecurityHeaders, validateCorsOrigin } from '../utils/httpSecurity';
import { checkRateLimit } from '../services/securityService';

/**
 * HTTP request interface for middleware
 */
export interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
  ip?: string;
  userId?: string;
}

/**
 * HTTP response interface for middleware
 */
export interface HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body?: any;
}

/**
 * Middleware result interface
 */
export interface MiddlewareResult {
  allowed: boolean;
  response?: HttpResponse;
  error?: string;
  sanitizedRequest?: HttpRequest;
}

/**
 * Security middleware configuration
 */
export interface SecurityConfig {
  enableRateLimit: boolean;
  enableCors: boolean;
  allowedOrigins: string[];
  enableRequestValidation: boolean;
  enableSecurityHeaders: boolean;
}

/**
 * Default security configuration
 */
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  enableRateLimit: true,
  enableCors: true,
  allowedOrigins: ['https://localhost:8080', 'https://127.0.0.1:8080'],
  enableRequestValidation: true,
  enableSecurityHeaders: true
};

/**
 * Main security middleware processor
 */
export class SecurityMiddleware {
  constructor(private config: SecurityConfig = DEFAULT_SECURITY_CONFIG) {}

  /**
   * Processes incoming HTTP request through security pipeline
   * @param request - HTTP request to process
   * @returns Middleware processing result
   */
  async processRequest(request: HttpRequest): Promise<MiddlewareResult> {
    try {
      // Step 1: Rate limiting
      if (this.config.enableRateLimit) {
        const rateLimitResult = this.checkRateLimit(request);
        if (!rateLimitResult.allowed) {
          return rateLimitResult;
        }
      }

      // Step 2: CORS validation
      if (this.config.enableCors) {
        const corsResult = this.validateCors(request);
        if (!corsResult.allowed) {
          return corsResult;
        }
      }

      // Step 3: Request validation and sanitization
      if (this.config.enableRequestValidation) {
        const validationResult = this.validateAndSanitizeRequest(request);
        if (!validationResult.allowed) {
          return validationResult;
        }
        request = validationResult.sanitizedRequest || request;
      }

      return {
        allowed: true,
        sanitizedRequest: request
      };
    } catch (error) {
      console.error('Security middleware error:', error);
      return {
        allowed: false,
        error: 'Security validation failed'
      };
    }
  }

  /**
   * Applies security headers to response
   * @param response - HTTP response
   * @returns Response with security headers
   */
  processResponse(response: HttpResponse): HttpResponse {
    if (!this.config.enableSecurityHeaders) {
      return response;
    }

    return {
      ...response,
      headers: applySecurityHeaders(response.headers)
    };
  }

  /**
   * Checks rate limiting for request
   */
  private checkRateLimit(request: HttpRequest): MiddlewareResult {
    const clientId = request.ip || request.userId || 'anonymous';
    const operation = this.getOperationType(request);
    
    const rateCheck = checkRateLimit(operation, clientId);
    
    if (!rateCheck.allowed) {
      return {
        allowed: false,
        response: {
          statusCode: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetTime || Date.now() + 60000) - Date.now()) / 1000)
          },
          body: {
            error: 'Rate limit exceeded',
            resetTime: rateCheck.resetTime
          }
        }
      };
    }

    return { allowed: true };
  }

  /**
   * Validates CORS for request
   */
  private validateCors(request: HttpRequest): MiddlewareResult {
    const origin = request.headers.origin || request.headers.Origin;
    
    if (origin && !validateCorsOrigin(origin, this.config.allowedOrigins)) {
      return {
        allowed: false,
        response: {
          statusCode: 403,
          headers: {},
          body: { error: 'CORS origin not allowed' }
        }
      };
    }

    return { allowed: true };
  }

  /**
   * Validates and sanitizes request
   */
  private validateAndSanitizeRequest(request: HttpRequest): MiddlewareResult {
    const validation = HttpSecurityValidator.validateRequest(request);
    
    if (!validation.isValid) {
      console.warn('Security validation failed:', validation.errors);
      return {
        allowed: false,
        response: {
          statusCode: 400,
          headers: {},
          body: {
            error: 'Request validation failed',
            details: validation.errors
          }
        }
      };
    }

    // Apply sanitized data to request
    const sanitizedRequest: HttpRequest = {
      ...request,
      body: validation.sanitizedData || request.body
    };

    return {
      allowed: true,
      sanitizedRequest
    };
  }

  /**
   * Determines operation type for rate limiting
   */
  private getOperationType(request: HttpRequest): 'WALLET_CREATION' | 'TOKEN_SEARCH' | 'BALANCE_CHECK' {
    const url = request.url.toLowerCase();
    
    if (url.includes('/wallet') && request.method === 'POST') {
      return 'WALLET_CREATION';
    }
    
    if (url.includes('/token') && request.method === 'GET') {
      return 'TOKEN_SEARCH';
    }
    
    return 'BALANCE_CHECK';
  }
}

/**
 * Express.js middleware adapter (for future backend integration)
 */
export const createExpressSecurityMiddleware = (config?: Partial<SecurityConfig>) => {
  const middleware = new SecurityMiddleware({ ...DEFAULT_SECURITY_CONFIG, ...config });
  
  return async (req: any, res: any, next: any) => {
    const request: HttpRequest = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      ip: req.ip,
      userId: req.user?.id
    };

    const result = await middleware.processRequest(request);
    
    if (!result.allowed) {
      if (result.response) {
        return res.status(result.response.statusCode)
          .set(result.response.headers)
          .json(result.response.body);
      }
      return res.status(403).json({ error: result.error });
    }

    // Attach sanitized data to request
    if (result.sanitizedRequest) {
      req.body = result.sanitizedRequest.body;
    }

    // Apply security headers to response
    const originalSend = res.send;
    res.send = function(data: any) {
      const response = middleware.processResponse({
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        body: data
      });
      
      res.set(response.headers);
      return originalSend.call(this, response.body || data);
    };

    next();
  };
};
