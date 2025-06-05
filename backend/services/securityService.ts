
/**
 * @fileoverview Main security service aggregator
 * @description Re-exports all security functionality from specialized services
 */

// Re-export password validation
export { validateMasterPassword } from './passwordService';
export type { SecurityValidation } from './passwordService';

// Re-export session management
export { createSecureSession, isSessionValid, extendSession } from './sessionService';

// Re-export audit logging
export { 
  logSecurityEvent, 
  logSecurityEvents, 
  createSecurityEvent 
} from './auditService';
export type { SecurityEvent, SecurityEventType } from './auditService';

// Re-export rate limiting
export { 
  checkRateLimit, 
  getRateLimitStatus, 
  resetRateLimit, 
  cleanupRateLimits 
} from './rateLimitService';
export type { RateLimitResult } from './rateLimitService';
