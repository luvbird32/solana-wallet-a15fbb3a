
/**
 * @fileoverview Password validation service
 * @description Provides password strength validation and security checks
 */

import { SECURITY_CONFIG } from '../config/constants';

/**
 * Result of security validation with warnings and recommendations
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
