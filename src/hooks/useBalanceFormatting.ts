
import { useMemo } from 'react';

export const useBalanceFormatting = () => {
  const formatBalance = useMemo(() => (balance: number, decimals: number = 2) => {
    return balance.toFixed(decimals);
  }, []);

  const formatUSD = useMemo(() => (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }, []);

  const formatPercentage = useMemo(() => (percentage: number, showSign: boolean = true) => {
    const sign = showSign && percentage > 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }, []);

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
