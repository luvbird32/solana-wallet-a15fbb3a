
/**
 * @fileoverview Security audit and logging service
 * @description Provides comprehensive security event logging for audit trails
 */

/**
 * Security event types
 */
export type SecurityEventType = 
  | 'wallet_created' 
  | 'wallet_imported' 
  | 'wallet_deleted' 
  | 'login_attempt' 
  | 'password_change';

/**
 * Security event interface
 */
export interface SecurityEvent {
  type: SecurityEventType;
  userId?: string;
  walletId?: string;
  success: boolean;
  metadata?: Record<string, any>;
}

/**
 * Logs security events for audit trails and monitoring
 * @param {SecurityEvent} event - The security event to log
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
export const logSecurityEvent = (event: SecurityEvent): void => {
  // TODO: Implement secure audit logging when backend is implemented
  console.log('[SECURITY AUDIT]', {
    ...event,
    timestamp: new Date().toISOString()
  });
};

/**
 * Logs multiple security events in batch
 * @param events - Array of security events to log
 */
export const logSecurityEvents = (events: SecurityEvent[]): void => {
  events.forEach(event => logSecurityEvent(event));
};

/**
 * Creates a standardized security event
 * @param type - Event type
 * @param success - Whether the operation was successful
 * @param options - Additional event options
 * @returns Security event object
 */
export const createSecurityEvent = (
  type: SecurityEventType,
  success: boolean,
  options: {
    userId?: string;
    walletId?: string;
    metadata?: Record<string, any>;
  } = {}
): SecurityEvent => {
  return {
    type,
    success,
    ...options
  };
};
