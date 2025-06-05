
import { useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';
import { TRANSACTION_STATUS_COLORS } from '@/constants/ui';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const useTransactionFormatting = () => {
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

  const getStatusColor = useMemo(() => (status: Transaction['status']) => {
    return TRANSACTION_STATUS_COLORS[status] || TRANSACTION_STATUS_COLORS.failed;
  }, []);

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
