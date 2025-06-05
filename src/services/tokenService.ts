
/**
 * @fileoverview Token search and metadata service with caching
 * @description Provides functions to search for tokens by address or name with in-memory caching
 */

import { TokenInfo } from '@/types/token';

/** Mock token database for development */
const MOCK_TOKENS: { [key: string]: TokenInfo } = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6
  },
  '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R': {
    address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    symbol: 'RAY',
    name: 'Raydium',
    decimals: 6
  },
  'So11111111111111111111111111111111111111112': {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Wrapped SOL',
    decimals: 9
  }
};

/** Mapping of token names/symbols to token info for search functionality */
const TOKENS_BY_NAME: { [key: string]: TokenInfo } = {
  'usd coin': MOCK_TOKENS['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
  'usdc': MOCK_TOKENS['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
  'raydium': MOCK_TOKENS['4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'],
  'ray': MOCK_TOKENS['4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'],
  'wrapped sol': MOCK_TOKENS['So11111111111111111111111111111111111111112'],
  'wsol': MOCK_TOKENS['So11111111111111111111111111111111111111112']
};

// In-memory cache for token data
const tokenCache = new Map<string, { data: TokenInfo | null; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves cached token data if still valid
 * @param {string} key - The cache key to lookup
 * @returns {TokenInfo | null} Cached token data or null if expired/missing
 */
const getCachedToken = (key: string): TokenInfo | null => {
  const cached = tokenCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

/**
 * Stores token data in cache with timestamp
 * @param {string} key - The cache key to store under
 * @param {TokenInfo | null} data - The token data to cache
 * @returns {void}
 */
const setCachedToken = (key: string, data: TokenInfo | null): void => {
  tokenCache.set(key, { data, timestamp: Date.now() });
};

/**
 * Searches for a token by its blockchain address
 * @param {string} address - The token's mint address
 * @returns {Promise<TokenInfo | null>} Token information or null if not found
 */
export const searchTokenByAddress = async (address: string): Promise<TokenInfo | null> => {
  // Check cache first
  const cached = getCachedToken(`address:${address}`);
  if (cached !== null) {
    console.log('Token found in cache:', cached);
    return cached;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const token = MOCK_TOKENS[address];
  let result: TokenInfo | null;
  
  if (token) {
    result = token;
  } else {
    // Return unknown token structure for unrecognized addresses
    result = {
      address: address,
      symbol: 'UNKNOWN',
      name: 'Unknown Token',
      decimals: 9
    };
  }

  // Cache the result
  setCachedToken(`address:${address}`, result);
  console.log('Token cached for address:', address);
  
  return result;
};

/**
 * Searches for a token by its name or symbol
 * @param {string} name - The token name or symbol to search for
 * @returns {Promise<TokenInfo | null>} Token information or null if not found
 */
export const searchTokenByName = async (name: string): Promise<TokenInfo | null> => {
  const cacheKey = `name:${name.toLowerCase()}`;
  
  // Check cache first
  const cached = getCachedToken(cacheKey);
  if (cached !== null) {
    console.log('Token found in cache:', cached);
    return cached;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const result = TOKENS_BY_NAME[name.toLowerCase()] || null;
  
  // Cache the result
  setCachedToken(cacheKey, result);
  console.log('Token cached for name:', name);
  
  return result;
};

/**
 * Clears all cached token data, forcing fresh lookups
 * @returns {void}
 */
export const clearTokenCache = (): void => {
  tokenCache.clear();
  console.log('Token cache cleared');
};
