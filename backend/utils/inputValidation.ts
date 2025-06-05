
/**
 * @fileoverview Input validation utilities for API endpoints
 * @description Provides comprehensive input validation for different data types
 * and API endpoints with proper error handling
 */

import { sanitizeString, sanitizeAddress, sanitizeTokenSymbol, sanitizeNumber } from './sanitization';

/**
 * Validation result interface
 */
export interface ValidationResult<T = any> {
  isValid: boolean;
  data?: T;
  errors: string[];
}

/**
 * Wallet creation input validation
 */
export const validateWalletCreation = (input: any): ValidationResult<{
  name: string;
  type: 'generated' | 'imported';
  seedPhrase?: string;
}> => {
  const errors: string[] = [];
  const data: any = {};

  try {
    // Validate name
    if (!input.name || typeof input.name !== 'string') {
      errors.push('Wallet name is required');
    } else {
      data.name = sanitizeString(input.name, { allowWhitespace: true, maxLength: 50 });
      if (data.name.length < 1) {
        errors.push('Wallet name cannot be empty');
      }
    }

    // Validate type
    if (!input.type || !['generated', 'imported'].includes(input.type)) {
      errors.push('Wallet type must be either "generated" or "imported"');
    } else {
      data.type = input.type;
    }

    // Validate seed phrase if importing
    if (input.type === 'imported') {
      if (!input.seedPhrase || typeof input.seedPhrase !== 'string') {
        errors.push('Seed phrase is required for imported wallets');
      } else {
        const sanitizedSeed = sanitizeString(input.seedPhrase, { allowWhitespace: true });
        const words = sanitizedSeed.trim().split(/\s+/);
        if (![12, 15, 18, 21, 24].includes(words.length)) {
          errors.push('Seed phrase must contain 12, 15, 18, 21, or 24 words');
        } else {
          data.seedPhrase = sanitizedSeed;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Wallet validation failed']
    };
  }
};

/**
 * Token search input validation
 */
export const validateTokenSearch = (input: any): ValidationResult<{
  query: string;
  type: 'address' | 'name' | 'symbol';
}> => {
  const errors: string[] = [];
  const data: any = {};

  try {
    // Validate query
    if (!input.query || typeof input.query !== 'string') {
      errors.push('Search query is required');
    } else {
      const sanitizedQuery = sanitizeString(input.query, { allowWhitespace: true, maxLength: 100 });
      if (sanitizedQuery.length < 1) {
        errors.push('Search query cannot be empty');
      } else {
        data.query = sanitizedQuery;
      }
    }

    // Validate search type
    if (!input.type || !['address', 'name', 'symbol'].includes(input.type)) {
      errors.push('Search type must be "address", "name", or "symbol"');
    } else {
      data.type = input.type;
    }

    // Additional validation based on type
    if (data.type === 'address' && data.query) {
      try {
        sanitizeAddress(data.query);
      } catch {
        errors.push('Invalid address format');
      }
    }

    if (data.type === 'symbol' && data.query) {
      try {
        sanitizeTokenSymbol(data.query);
      } catch {
        errors.push('Invalid token symbol format');
      }
    }

    return {
      isValid: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Token search validation failed']
    };
  }
};

/**
 * Transaction input validation
 */
export const validateTransaction = (input: any): ValidationResult<{
  toAddress: string;
  amount: number;
  tokenAddress?: string;
}> => {
  const errors: string[] = [];
  const data: any = {};

  try {
    // Validate recipient address
    if (!input.toAddress || typeof input.toAddress !== 'string') {
      errors.push('Recipient address is required');
    } else {
      try {
        data.toAddress = sanitizeAddress(input.toAddress);
      } catch {
        errors.push('Invalid recipient address format');
      }
    }

    // Validate amount
    if (input.amount === undefined || input.amount === null) {
      errors.push('Amount is required');
    } else {
      try {
        data.amount = sanitizeNumber(input.amount, { min: 0 });
        if (data.amount <= 0) {
          errors.push('Amount must be greater than zero');
        }
      } catch {
        errors.push('Invalid amount format');
      }
    }

    // Validate token address (optional)
    if (input.tokenAddress) {
      try {
        data.tokenAddress = sanitizeAddress(input.tokenAddress);
      } catch {
        errors.push('Invalid token address format');
      }
    }

    return {
      isValid: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Transaction validation failed']
    };
  }
};

/**
 * Balance check input validation
 */
export const validateBalanceCheck = (input: any): ValidationResult<{
  address: string;
  tokenAddress?: string;
}> => {
  const errors: string[] = [];
  const data: any = {};

  try {
    // Validate wallet address
    if (!input.address || typeof input.address !== 'string') {
      errors.push('Wallet address is required');
    } else {
      try {
        data.address = sanitizeAddress(input.address);
      } catch {
        errors.push('Invalid wallet address format');
      }
    }

    // Validate token address (optional)
    if (input.tokenAddress) {
      try {
        data.tokenAddress = sanitizeAddress(input.tokenAddress);
      } catch {
        errors.push('Invalid token address format');
      }
    }

    return {
      isValid: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Balance check validation failed']
    };
  }
};

/**
 * Generic API input validator
 */
export const validateApiInput = <T>(
  input: any,
  schema: Record<string, {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    validator?: (value: any) => boolean;
  }>
): ValidationResult<T> => {
  const errors: string[] = [];
  const data: any = {};

  try {
    for (const [key, rules] of Object.entries(schema)) {
      const value = input[key];
      
      // Check required fields
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${key} is required`);
        continue;
      }

      // Skip validation for optional empty fields
      if (!rules.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Type validation
      switch (rules.type) {
        case 'string':
          if (typeof value !== 'string') {
            errors.push(`${key} must be a string`);
            break;
          }
          
          const sanitizedString = sanitizeString(value, {
            allowWhitespace: true,
            maxLength: rules.maxLength
          });
          
          if (rules.minLength && sanitizedString.length < rules.minLength) {
            errors.push(`${key} must be at least ${rules.minLength} characters`);
          }
          
          if (rules.pattern && !rules.pattern.test(sanitizedString)) {
            errors.push(`${key} format is invalid`);
          }
          
          data[key] = sanitizedString;
          break;

        case 'number':
          try {
            const num = sanitizeNumber(value, {
              min: rules.min,
              max: rules.max
            });
            data[key] = num;
          } catch {
            errors.push(`${key} must be a valid number`);
          }
          break;

        case 'boolean':
          if (typeof value !== 'boolean') {
            errors.push(`${key} must be a boolean`);
          } else {
            data[key] = value;
          }
          break;

        case 'array':
          if (!Array.isArray(value)) {
            errors.push(`${key} must be an array`);
          } else {
            data[key] = value;
          }
          break;

        case 'object':
          if (typeof value !== 'object' || Array.isArray(value)) {
            errors.push(`${key} must be an object`);
          } else {
            data[key] = value;
          }
          break;
      }

      // Custom validator
      if (rules.validator && data[key] !== undefined && !rules.validator(data[key])) {
        errors.push(`${key} validation failed`);
      }
    }

    return {
      isValid: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Input validation failed']
    };
  }
};
