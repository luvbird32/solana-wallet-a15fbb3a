
/**
 * @fileoverview Session management service
 * @description Provides secure session creation and management
 */

import { generateSecureRandom } from '../utils/cryptoUtils';
import { SECURITY_CONFIG } from '../config/constants';

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
 * Validates if a session is still active
 * @param expiresAt - Session expiration timestamp
 * @returns Whether the session is still valid
 */
export const isSessionValid = (expiresAt: number): boolean => {
  return Date.now() < expiresAt;
};

/**
 * Extends an existing session
 * @param currentExpiresAt - Current session expiration
 * @returns New expiration timestamp
 */
export const extendSession = (currentExpiresAt: number): number => {
  if (!isSessionValid(currentExpiresAt)) {
    throw new Error('Cannot extend expired session');
  }
  
  return Date.now() + SECURITY_CONFIG.SESSION.TIMEOUT_MS;
};
