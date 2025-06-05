
/**
 * @fileoverview Frontend API client for wallet operations
 * @description Provides frontend interface to backend wallet services
 */

import { WalletAccount } from '@/types/wallet';

/**
 * Frontend API client for storing wallet data
 * @param {WalletAccount} wallet - The wallet to store
 * @returns {Promise<{success: boolean; error?: string}>} Operation result
 */
export const storeWallet = async (wallet: WalletAccount): Promise<{success: boolean; error?: string}> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch('/api/wallets', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(wallet)
    // });
    // return await response.json();
    
    // Import backend service for demo (would be API call in production)
    const { storeWallet: backendStore } = await import('../../backend/services/frontendWalletService');
    return await backendStore(wallet);
  } catch (error) {
    console.error('Store wallet API call failed:', error);
    throw error;
  }
};

/**
 * Frontend API client for retrieving wallet data
 * @param {string} walletId - The wallet ID to retrieve
 * @returns {Promise<WalletAccount | null>} The wallet or null if not found
 */
export const getWallet = async (walletId: string): Promise<WalletAccount | null> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch(`/api/wallets/${walletId}`);
    // return await response.json();
    
    // Import backend service for demo (would be API call in production)
    const { getWallet: backendGet } = await import('../../backend/services/frontendWalletService');
    return await backendGet(walletId);
  } catch (error) {
    console.error('Get wallet API call failed:', error);
    throw error;
  }
};

/**
 * Frontend API client for retrieving all wallets
 * @returns {Promise<WalletAccount[]>} Array of all wallets
 */
export const getAllWallets = async (): Promise<WalletAccount[]> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch('/api/wallets');
    // return await response.json();
    
    // Import backend service for demo (would be API call in production)
    const { getAllWallets: backendGetAll } = await import('../../backend/services/frontendWalletService');
    return await backendGetAll();
  } catch (error) {
    console.error('Get all wallets API call failed:', error);
    throw error;
  }
};

/**
 * Frontend API client for deleting a wallet
 * @param {string} walletId - The wallet ID to delete
 * @returns {Promise<{success: boolean; error?: string}>} Operation result
 */
export const deleteWallet = async (walletId: string): Promise<{success: boolean; error?: string}> => {
  try {
    // TODO: Replace with actual API call when backend is deployed
    // const response = await fetch(`/api/wallets/${walletId}`, { method: 'DELETE' });
    // return await response.json();
    
    // Import backend service for demo (would be API call in production)
    const { deleteWallet: backendDelete } = await import('../../backend/services/frontendWalletService');
    return await backendDelete(walletId);
  } catch (error) {
    console.error('Delete wallet API call failed:', error);
    throw error;
  }
};
