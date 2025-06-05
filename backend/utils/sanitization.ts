
/**
 * @fileoverview Data sanitization and validation utilities
 * @description Provides comprehensive input sanitization and validation functions
 */

/**
 * Sanitizes string input by removing potentially harmful characters
 * @param {string} input - The string to sanitize
 * @param {object} options - Sanitization options
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input: string, options: {
  allowWhitespace?: boolean;
  maxLength?: number;
  alphanumericOnly?: boolean;
} = {}): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  let sanitized = input.trim();

  // Remove HTML tags and potentially harmful characters
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/[<>'"&]/g, '');

  if (options.alphanumericOnly) {
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  if (!options.allowWhitespace) {
    sanitized = sanitized.replace(/\s+/g, ' ');
  }

  if (options.maxLength && sanitized.length > options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength);
  }

  return sanitized;
};

/**
 * Validates and sanitizes wallet name
 * @param {string} name - The wallet name to validate
 * @returns {string} Sanitized wallet name
 */
export const sanitizeWalletName = (name: string): string => {
  if (!name || typeof name !== 'string') {
    throw new Error('Wallet name is required and must be a string');
  }

  const sanitized = sanitizeString(name, {
    allowWhitespace: true,
    maxLength: 50,
    alphanumericOnly: false
  });

  if (sanitized.length < 1) {
    throw new Error('Wallet name cannot be empty after sanitization');
  }

  if (sanitized.length > 50) {
    throw new Error('Wallet name cannot exceed 50 characters');
  }

  return sanitized;
};

/**
 * Validates Solana address format
 * @param {string} address - The address to validate
 * @returns {string} Validated address
 */
export const sanitizeAddress = (address: string): string => {
  if (!address || typeof address !== 'string') {
    throw new Error('Address is required and must be a string');
  }

  const sanitized = sanitizeString(address, {
    allowWhitespace: false,
    alphanumericOnly: true
  });

  // Basic Solana address validation (32-44 characters, base58)
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(sanitized)) {
    throw new Error('Invalid Solana address format');
  }

  return sanitized;
};

/**
 * Validates token symbol format
 * @param {string} symbol - The token symbol to validate
 * @returns {string} Validated symbol
 */
export const sanitizeTokenSymbol = (symbol: string): string => {
  if (!symbol || typeof symbol !== 'string') {
    throw new Error('Token symbol is required and must be a string');
  }

  const sanitized = sanitizeString(symbol, {
    allowWhitespace: false,
    maxLength: 10,
    alphanumericOnly: true
  }).toUpperCase();

  if (sanitized.length < 1 || sanitized.length > 10) {
    throw new Error('Token symbol must be 1-10 characters');
  }

  return sanitized;
};

/**
 * Sanitizes numeric input
 * @param {any} input - The numeric input to sanitize
 * @param {object} options - Validation options
 * @returns {number} Sanitized number
 */
export const sanitizeNumber = (input: any, options: {
  min?: number;
  max?: number;
  integer?: boolean;
} = {}): number => {
  const num = Number(input);

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Input must be a valid number');
  }

  if (options.integer && !Number.isInteger(num)) {
    throw new Error('Input must be an integer');
  }

  if (options.min !== undefined && num < options.min) {
    throw new Error(`Number must be at least ${options.min}`);
  }

  if (options.max !== undefined && num > options.max) {
    throw new Error(`Number must be at most ${options.max}`);
  }

  return num;
};
