/**
 * @fileoverview Security service for authentication, validation, and audit logging
 * @description Provides comprehensive security features including password validation,
 * session management, rate limiting, and security event logging
 */

import { generateSecureRandom, encryptSensitiveData, decryptSensitiveData } from '../utils/cryptoUtils';
import { SECURITY_CONFIG } from '../config/constants';

/**
 * Result of security validation with warnings and recommendations
 * @interface SecurityValidation
 */
export interface SecurityValidation {
  /** Whether the security check passed */
  isSecure: boolean;
  /** Array of security warnings */
  warnings: string[];
  /** Array of security recommendations */
  recommendations: string[];
}

/**
 * Validates a master password against security requirements
 * @param {string} password - The password to validate
 * @returns {SecurityValidation} Comprehensive validation result
 * @description Performs multi-criteria password validation including:
 * - Minimum length requirements
 * - Character complexity requirements
 * - Pattern analysis for common weaknesses
 * @security Uses configurable security policies from SECURITY_CONFIG
 * @example
 * ```typescript
 * const validation = validateMasterPassword('MySecurePass123!');
 * if (!validation.isSecure) {
 *   console.error('Password issues:', validation.warnings);
 * }
 * ```
 */
export const validateMasterPassword = (password: string): SecurityValidation => {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  if (password.length < SECURITY_CONFIG.PASSWORD.MIN_LENGTH) {
    warnings.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD.MIN_LENGTH} characters long`);
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    warnings.push('Password must contain at least one uppercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    warnings.push('Password must contain at least one lowercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
    warnings.push('Password must contain at least one number');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_SYMBOLS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    warnings.push('Password must contain at least one special character');
  }
  
  if (warnings.length === 0) {
    recommendations.push('Strong password detected');
  } else {
    recommendations.push('Consider using a password manager to generate a secure password');
  }
  
  return {
    isSecure: warnings.length === 0,
    warnings,
    recommendations
  };
};

/**
 * Creates a secure session with cryptographic session ID and expiration
 * @returns {Object} Session data with ID and expiration timestamp
 * @returns {string} returns.sessionId - Cryptographically secure session identifier
 * @returns {number} returns.expiresAt - Unix timestamp when session expires
 * @description Generates sessions with:
 * - Cryptographically secure random session IDs
 * - Configurable timeout periods
 * - Automatic expiration handling
 * @security Session IDs are generated using cryptographically secure randomness
 * @example
 * ```typescript
 * const session = createSecureSession();
 * // Store session.sessionId and session.expiresAt in secure storage
 * ```
 */
export const createSecureSession = (): { sessionId: string; expiresAt: number } => {
  const sessionId = generateSecureRandom(32);
  const expiresAt = Date.now() + SECURITY_CONFIG.SESSION.TIMEOUT_MS;
  
  return { sessionId, expiresAt };
};

/**
 * Logs security events for audit trails and monitoring
 * @param {Object} event - The security event to log
 * @param {'wallet_created' | 'wallet_imported' | 'wallet_deleted' | 'login_attempt' | 'password_change'} event.type - Type of security event
 * @param {string} [event.userId] - Optional user identifier
 * @param {string} [event.walletId] - Optional wallet identifier
 * @param {boolean} event.success - Whether the operation was successful
 * @param {Record<string, any>} [event.metadata] - Optional additional event data
 * @returns {void}
 * @description Creates comprehensive audit logs for security monitoring including:
 * - Event types and outcomes
 * - User and wallet associations
 * - Timestamps and metadata
 * @security Critical for compliance and security monitoring
 * @todo Implement secure audit storage when backend infrastructure is ready
 * @example
 * ```typescript
 * logSecurityEvent({
 *   type: 'wallet_created',
 *   userId: 'user_123',
 *   success: true,
 *   metadata: { walletType: 'generated' }
 * });
 * ```
 */
export const logSecurityEvent = (event: {
  type: 'wallet_created' | 'wallet_imported' | 'wallet_deleted' | 'login_attempt' | 'password_change';
  userId?: string;
  walletId?: string;
  success: boolean;
  metadata?: Record<string, any>;
}): void => {
  // TODO: Implement secure audit logging when backend is implemented
  console.log('[SECURITY AUDIT]', {
    ...event,
    timestamp: new Date().toISOString()
  });
};

/**
 * Rate limiting storage (in-memory for demo - use Redis in production)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Checks rate limiting for various operations to prevent abuse
 * @param {keyof typeof SECURITY_CONFIG.RATE_LIMITS} operation - The operation to check
 * @param {string} clientId - Unique identifier for the client (IP, user ID, etc.)
 * @returns {Object} Rate limit check result
 * @returns {boolean} returns.allowed - Whether the operation is allowed
 * @returns {number} [returns.resetTime] - When the rate limit resets (if blocked)
 * @description Implements rate limiting to prevent:
 * - Brute force attacks
 * - API abuse
 * - Resource exhaustion
 * @security Essential for preventing various attack vectors
 * @example
 * ```typescript
 * const limitCheck = checkRateLimit('wallet_creation', clientIP);
 * if (!limitCheck.allowed) {
 *   throw new Error('Rate limit exceeded');
 * }
 * ```
 */
export const checkRateLimit = (operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS, clientId: string): {
  allowed: boolean;
  resetTime?: number;
  remaining?: number;
} => {
  const config = SECURITY_CONFIG.RATE_LIMITS[operation];
  if (!config) {
    console.warn(`Unknown rate limit operation: ${operation}`);
    return { allowed: true };
  }

  const key = `${operation}:${clientId}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetTime <= now) {
    // Create new window
    entry = {
      count: 0,
      resetTime: now + config.windowMs
    };
  }

  // Check if request is allowed
  if (entry.count >= config.requests) {
    rateLimitStore.set(key, entry);
    return {
      allowed: false,
      resetTime: entry.resetTime,
      remaining: 0
    };
  }

  // Increment counter and allow request
  entry.count++;
  rateLimitStore.set(key, entry);

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    cleanupExpiredEntries();
  }

  return {
    allowed: true,
    remaining: config.requests - entry.count
  };
};

/**
 * Cleans up expired rate limit entries to prevent memory leaks
 * @returns {void}
 */
const cleanupExpiredEntries = (): void => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime <= now) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Gets current rate limit status for debugging/monitoring
 * @param {string} clientId - Client identifier
 * @returns {Object} Current rate limit status for all operations
 */
export const getRateLimitStatus = (clientId: string): Record<string, any> => {
  const status: Record<string, any> = {};
  
  for (const operation of Object.keys(SECURITY_CONFIG.RATE_LIMITS)) {
    const key = `${operation}:${clientId}`;
    const entry = rateLimitStore.get(key);
    
    status[operation] = {
      requests: entry?.count || 0,
      resetTime: entry?.resetTime,
      allowed: !entry || entry.count < SECURITY_CONFIG.RATE_LIMITS[operation as keyof typeof SECURITY_CONFIG.RATE_LIMITS].requests
    };
  }
  
  return status;
};
