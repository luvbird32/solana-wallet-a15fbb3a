
import { useState, useCallback } from 'react';
import { checkRateLimit } from '../../backend/services/securityService';
import { SECURITY_CONFIG } from '../../backend/config/constants';

interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
  remaining?: number;
}

export const useRateLimit = () => {
  const [rateLimitStatus, setRateLimitStatus] = useState<Record<string, RateLimitResult>>({});

  const checkLimit = useCallback(async (
    operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS,
    clientId: string = 'default'
  ): Promise<RateLimitResult> => {
    try {
      const result = checkRateLimit(operation, clientId);
      
      setRateLimitStatus(prev => ({
        ...prev,
        [`${operation}-${clientId}`]: result
      }));

      return result;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return { allowed: false };
    }
  }, []);

  const isRateLimited = useCallback((
    operation: keyof typeof SECURITY_CONFIG.RATE_LIMITS,
    clientId: string = 'default'
  ): boolean => {
    const key = `${operation}-${clientId}`;
    return rateLimitStatus[key]?.allowed === false;
  }, [rateLimitStatus]);

  return {
    checkLimit,
    isRateLimited,
    rateLimitStatus
  };
};
