
/**
 * @fileoverview Custom hook for address formatting and validation utilities
 */

import { useMemo } from 'react';

/**
 * Custom hook providing address formatting and validation functions
 * @returns {Object} Object containing formatting and validation functions
 */
export const useAddressFormatting = () => {
  /**
   * Formats a long address by showing start and end characters with ellipsis
   * @param {string} address - The address to format
   * @param {number} [startChars=4] - Number of characters to show at start
   * @param {number} [endChars=4] - Number of characters to show at end
   * @returns {string} Formatted address string
   */
  const formatAddress = useMemo(() => (address: string, startChars: number = 4, endChars: number = 4) => {
    if (!address || address.length <= startChars + endChars) {
      return address;
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }, []);

  /**
   * Formats a public key for display (convenience wrapper around formatAddress)
   * @param {string} publicKey - The public key to format
   * @returns {string} Formatted public key string
   */
  const formatPublicKey = useMemo(() => (publicKey: string) => {
    return formatAddress(publicKey, 4, 4);
  }, [formatAddress]);

  /**
   * Validates if a string is a valid Solana address format
   * @param {string} address - The address to validate
   * @returns {boolean} True if valid Solana address format, false otherwise
   */
  const isValidSolanaAddress = useMemo(() => (address: string) => {
    // Basic Solana address validation (base58, 32-44 characters)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(address);
  }, []);

  return {
    formatAddress,
    formatPublicKey,
    isValidSolanaAddress,
  };
};
