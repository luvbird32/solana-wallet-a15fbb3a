
import { generateSecureRandom, encryptSensitiveData, decryptSensitiveData } from '../utils/cryptoUtils';
import { SECURITY_CONFIG } from '../config/constants';

export interface SecurityValidation {
  isSecure: boolean;
  warnings: string[];
  recommendations: string[];
}

// Master password validation
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

// Session management
export const createSecureSession = (): { sessionId: string; expiresAt: number } => {
  const sessionId = generateSecureRandom(32);
  const expiresAt = Date.now() + SECURITY_CONFIG.SESSION.TIMEOUT_MS;
  
  return { sessionId, expiresAt };
};

// Audit logging for security events
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

// Rate limiting
export const checkRateLimit = (operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS, clientId: string): {
  allowed: boolean;
  resetTime?: number;
} => {
  // TODO: Implement actual rate limiting with Redis or similar when backend is implemented
  // For now, always allow operations
  return { allowed: true };
};
