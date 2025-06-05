
/**
 * @fileoverview Frontend API client for token operations
 * @description Provides frontend interface to backend token services
 */

import { TokenInfo } from '@/types/token';

/**
 * Frontend API client for searching tokens by address
 * @param {string} address - The token's mint address
 * @returns {Promise<TokenInfo | null>} Token information or null if not found
 */
export const searchTokenByAddress = async (address: string): Promise<TokenInfo | null> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch(`/api/tokens/address/${address}`);
    // return await response.json();
    
    // Mock implementation with delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Import backend service for demo (would be API call in production)
    const { searchTokenByAddress: backendSearch } = await import('../../backend/services/tokenService');
    return backendSearch(address);
  } catch (error) {
    console.error('Token search by address failed:', error);
    throw error;
  }
};

/**
 * Frontend API client for searching tokens by name
 * @param {string} name - The token name or symbol to search for
 * @returns {Promise<TokenInfo | null>} Token information or null if not found
 */
export const searchTokenByName = async (name: string): Promise<TokenInfo | null> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch(`/api/tokens/search?name=${encodeURIComponent(name)}`);
    // return await response.json();
    
    // Mock implementation with delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Import backend service for demo (would be API call in production)
    const { searchTokenByName: backendSearch } = await import('../../backend/services/tokenService');
    return backendSearch(name);
  } catch (error) {
    console.error('Token search by name failed:', error);
    throw error;
  }
};

/**
 * Frontend API client for clearing token cache
 * @returns {Promise<void>}
 */
export const clearTokenCache = async (): Promise<void> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // await fetch('/api/tokens/cache', { method: 'DELETE' });
    
    // Import backend service for demo (would be API call in production)
    const { clearTokenCache: backendClear } = await import('../../backend/services/tokenService');
    backendClear();
  } catch (error) {
    console.error('Clear token cache failed:', error);
    throw error;
  }
};
