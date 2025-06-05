
/**
 * @fileoverview Custom hook for formatting balances, currencies, and percentages
 */

import { useMemo } from 'react';

/**
 * Custom hook providing various number and currency formatting functions
 * @returns {Object} Object containing formatting functions for balances and currencies
 */
export const useBalanceFormatting = () => {
  /**
   * Formats a numeric balance to a specified number of decimal places
   * @param {number} balance - The balance to format
   * @param {number} [decimals=2] - Number of decimal places to show
   * @returns {string} Formatted balance string
   */
  const formatBalance = useMemo(() => (balance: number, decimals: number = 2) => {
    return balance.toFixed(decimals);
  }, []);

  /**
   * Formats a number as USD currency
   * @param {number} amount - The amount to format as USD
   * @returns {string} Formatted USD currency string
   */
  const formatUSD = useMemo(() => (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }, []);

  /**
   * Formats a percentage with optional positive sign
   * @param {number} percentage - The percentage to format
   * @param {boolean} [showSign=true] - Whether to show + sign for positive values
   * @returns {string} Formatted percentage string
   */
  const formatPercentage = useMemo(() => (percentage: number, showSign: boolean = true) => {
    const sign = showSign && percentage > 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }, []);

  /**
   * Formats a token amount with symbol and optional sign
   * @param {number} amount - The token amount to format
   * @param {string} symbol - The token symbol to append
   * @param {boolean} [showSign=false] - Whether to show + sign for positive values
   * @returns {string} Formatted token amount string
   */
  const formatTokenAmount = useMemo(() => (amount: number, symbol: string, showSign: boolean = false) => {
    const sign = showSign ? (amount > 0 ? '+' : '') : '';
    return `${sign}${formatBalance(amount)} ${symbol}`;
  }, [formatBalance]);

  return {
    formatBalance,
    formatUSD,
    formatPercentage,
    formatTokenAmount,
  };
};
