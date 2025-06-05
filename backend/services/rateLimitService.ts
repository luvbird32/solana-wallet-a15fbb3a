
/**
 * @fileoverview Rate limiting service
 * @description Provides rate limiting functionality to prevent abuse and attacks
 */

import { SECURITY_CONFIG } from '../config/constants';

/**
 * Rate limit check result interface
 */
export interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
  remaining?: number;
}

/**
 * Rate limiting storage (in-memory for demo - use Redis in production)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Checks rate limiting for various operations to prevent abuse
 * @param {keyof typeof SECURITY_CONFIG.RATE_LIMITS} operation - The operation to check
 * @param {string} clientId - Unique identifier for the client (IP, user ID, etc.)
 * @returns {RateLimitResult} Rate limit check result
 * @description Implements rate limiting to prevent:
 * - Brute force attacks
 * - API abuse
 * - Resource exhaustion
 * @security Essential for preventing various attack vectors
 * @example
 * ```typescript
 * const limitCheck = checkRateLimit('WALLET_CREATION', clientIP);
 * if (!limitCheck.allowed) {
 *   throw new Error('Rate limit exceeded');
 * }
 * ```
 */
export const checkRateLimit = (
  operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS, 
  clientId: string
): RateLimitResult => {
  const config = SECURITY_CONFIG.RATE_LIMITS[operation];
  if (!config) {
    console.warn(`Unknown rate limit operation: ${String(operation)}`);
    return { allowed: true };
  }

  const key = `${String(operation)}:${clientId}`;
  const now = Date.now();

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

/**
 * Resets rate limit for a specific operation and client
 * @param operation - The operation to reset
 * @param clientId - Client identifier
 */
export const resetRateLimit = (
  operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS,
  clientId: string
): void => {
  const key = `${String(operation)}:${clientId}`;
  rateLimitStore.delete(key);
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
 * Manually trigger cleanup of expired entries
 */
export const cleanupRateLimits = (): void => {
  cleanupExpiredEntries();
};
