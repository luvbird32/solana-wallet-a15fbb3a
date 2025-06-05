
/**
 * @fileoverview Unit tests for token utility functions
 * @description Tests token formatting, validation, and conversion utilities
 * used throughout the Solana wallet application
 */

import { describe, it, expect } from 'vitest';
import { formatTokenAmount, isValidTokenAmount, convertTokenDecimals } from '@/utils/tokenUtils';

/**
 * Test suite for token utility functions
 * @description Comprehensive tests for token amount formatting,
 * validation, and decimal conversion operations
 */
describe('Token Utils', () => {
  /**
   * Test suite for formatTokenAmount function
   * @description Tests various token amount formatting scenarios
   * including edge cases and different decimal precisions
   */
  describe('formatTokenAmount', () => {
    /**
     * Test basic token amount formatting with standard values
     * @description Verifies that normal token amounts are formatted
     * correctly with appropriate decimal places and separators
     */
    it('should format token amounts correctly', () => {
      // Test standard amounts with different decimal places
      expect(formatTokenAmount(1000.12345, 2)).toBe('1,000.12');
      expect(formatTokenAmount(0.001, 4)).toBe('0.0010');
      expect(formatTokenAmount(1234567.89, 2)).toBe('1,234,567.89');
    });

    /**
     * Test formatting of very small token amounts
     * @description Verifies that very small amounts (like micro-tokens)
     * are formatted correctly without scientific notation
     */
    it('should handle very small amounts', () => {
      expect(formatTokenAmount(0.000001, 6)).toBe('0.000001');
      expect(formatTokenAmount(0.0000001, 8)).toBe('0.00000010');
    });

    /**
     * Test formatting of zero and negative amounts
     * @description Verifies edge cases including zero values
     * and negative amounts (if applicable)
     */
    it('should handle zero and edge cases', () => {
      expect(formatTokenAmount(0, 2)).toBe('0.00');
      expect(formatTokenAmount(0, 0)).toBe('0');
    });

    /**
     * Test default decimal places when not specified
     * @description Verifies that the function uses sensible defaults
     * when decimal places are not explicitly provided
     */
    it('should use default decimal places when not specified', () => {
      // Assuming default is 2 decimal places
      expect(formatTokenAmount(123.456)).toBe('123.46');
      expect(formatTokenAmount(123)).toBe('123.00');
    });
  });

  /**
   * Test suite for isValidTokenAmount function
   * @description Tests token amount validation logic for various
   * input types and edge cases
   */
  describe('isValidTokenAmount', () => {
    /**
     * Test validation of valid token amounts
     * @description Verifies that properly formatted positive
     * numbers are correctly identified as valid
     */
    it('should validate correct token amounts', () => {
      expect(isValidTokenAmount('123.45')).toBe(true);
      expect(isValidTokenAmount('0.001')).toBe(true);
      expect(isValidTokenAmount('1000000')).toBe(true);
      expect(isValidTokenAmount('0')).toBe(true);
    });

    /**
     * Test validation of invalid token amounts
     * @description Verifies that invalid formats, negative numbers,
     * and non-numeric strings are correctly rejected
     */
    it('should reject invalid token amounts', () => {
      expect(isValidTokenAmount('-123')).toBe(false);
      expect(isValidTokenAmount('abc')).toBe(false);
      expect(isValidTokenAmount('')).toBe(false);
      expect(isValidTokenAmount('123.45.67')).toBe(false);
    });

    /**
     * Test validation of edge cases and special values
     * @description Verifies handling of undefined, null, and other
     * edge case inputs that might occur in real usage
     */
    it('should handle edge cases', () => {
      expect(isValidTokenAmount(undefined as any)).toBe(false);
      expect(isValidTokenAmount(null as any)).toBe(false);
      expect(isValidTokenAmount('.')).toBe(false);
      expect(isValidTokenAmount('0.')).toBe(true);
    });
  });

  /**
   * Test suite for convertTokenDecimals function
   * @description Tests decimal conversion between different token
   * precision formats (e.g., wei to ether equivalent)
   */
  describe('convertTokenDecimals', () => {
    /**
     * Test conversion from higher to lower decimal precision
     * @description Verifies that converting from blockchain native
     * units to human-readable units works correctly
     */
    it('should convert from higher to lower decimals', () => {
      // Convert from 9 decimals (SOL) to 2 decimals (display)
      expect(convertTokenDecimals(1000000000, 9, 2)).toBe(100);
      expect(convertTokenDecimals(500000000, 9, 2)).toBe(50);
    });

    /**
     * Test conversion from lower to higher decimal precision
     * @description Verifies that converting from human-readable
     * units to blockchain native units works correctly
     */
    it('should convert from lower to higher decimals', () => {
      // Convert from 2 decimals (display) to 9 decimals (SOL)
      expect(convertTokenDecimals(1, 2, 9)).toBe(10000000);
      expect(convertTokenDecimals(0.5, 2, 9)).toBe(5000000);
    });

    /**
     * Test conversion with same decimal precision
     * @description Verifies that no conversion occurs when
     * source and target decimals are the same
     */
    it('should handle same decimal precision', () => {
      expect(convertTokenDecimals(123.45, 2, 2)).toBe(123.45);
      expect(convertTokenDecimals(1000, 0, 0)).toBe(1000);
    });

    /**
     * Test conversion with zero and edge case values
     * @description Verifies that edge cases like zero amounts
     * and extreme decimal differences are handled correctly
     */
    it('should handle zero and edge cases', () => {
      expect(convertTokenDecimals(0, 9, 2)).toBe(0);
      expect(convertTokenDecimals(1, 0, 18)).toBe(1000000000000000000);
    });
  });
});
