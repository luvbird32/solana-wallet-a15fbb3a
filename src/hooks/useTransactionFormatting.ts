
/**
 * @fileoverview Custom hook for formatting transaction data and UI elements
 */

import { useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';
import { TRANSACTION_STATUS_COLORS } from '@/constants/ui';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Custom hook providing transaction formatting utilities
 * @returns {Object} Object containing transaction formatting functions
 */
export const useTransactionFormatting = () => {
  /**
   * Formats a date into a relative time string (e.g., "5m ago", "2h ago")
   * @param {Date} date - The date to format
   * @returns {string} Formatted relative time string
   */
  const formatTime = useMemo(() => (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }, []);

  /**
   * Gets the appropriate color for a transaction status
   * @param {Transaction['status']} status - The transaction status
   * @returns {string} CSS color class for the status
   */
  const getStatusColor = useMemo(() => (status: Transaction['status']) => {
    return TRANSACTION_STATUS_COLORS[status] || TRANSACTION_STATUS_COLORS.failed;
  }, []);

  /**
   * Gets the appropriate icon component for a transaction type
   * @param {TransactionType} type - The transaction type
   * @returns {React.ComponentType | null} Icon component or null
   */
  const getTypeIcon = useMemo(() => (type: TransactionType) => {
    switch (type) {
      case 'send': 
        return ArrowUp;
      case 'receive': 
        return ArrowDown;
      case 'swap': 
        return null; // Will render a div with bg-blue-500
      default: 
        return null;
    }
  }, []);

  /**
   * Gets a descriptive string for the transaction direction and counterparty
   * @param {Transaction} transaction - The transaction object
   * @returns {string} Formatted description string
   */
  const getTypeDescription = useMemo(() => (transaction: Transaction) => {
    const { type, toFrom } = transaction;
    if (type === 'swap') return toFrom;
    return `${type === 'send' ? 'To' : 'From'} ${toFrom}`;
  }, []);

  return {
    formatTime,
    getStatusColor,
    getTypeIcon,
    getTypeDescription,
  };
};
