
/**
 * @fileoverview Custom hooks for token data fetching with React Query integration
 */

import { useQuery } from '@tanstack/react-query';
import { TokenInfo } from '@/types/token';
import { searchTokenByAddress, searchTokenByName } from '@/services/tokenService';

/**
 * Custom hook for searching tokens with caching via React Query
 * @param {string} searchValue - The value to search for (address or name)
 * @param {'address' | 'name'} searchType - Whether to search by address or name
 * @returns {Object} React Query result object with token data
 */
export const useTokenSearch = (searchValue: string, searchType: 'address' | 'name') => {
  return useQuery({
    queryKey: ['token-search', searchType, searchValue],
    queryFn: async () => {
      if (!searchValue.trim()) return null;
      
      if (searchType === 'address') {
        return await searchTokenByAddress(searchValue);
      } else {
        return await searchTokenByName(searchValue);
      }
    },
    enabled: !!searchValue.trim(),
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2,
  });
};

/**
 * Custom hook for fetching token balance data with caching and automatic refresh
 * @returns {Object} React Query result object with token balance data
 */
export const useTokenBalances = () => {
  return useQuery({
    queryKey: ['token-balances'],
    queryFn: async (): Promise<any[]> => {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          symbol: 'SOL',
          name: 'Solana',
          balance: 45.67,
          usdValue: 2834.21,
          change24h: 5.23,
          icon: '◎'
        },
        {
          symbol: 'USDC',
          name: 'USD Coin',
          balance: 1250.00,
          usdValue: 1250.00,
          change24h: 0.01,
          icon: '$'
        }
      ];
    },
    staleTime: 30 * 1000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};
