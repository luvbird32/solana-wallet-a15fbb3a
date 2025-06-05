
/**
 * @fileoverview Frontend wallet utility functions (mock implementations for development)
 * @note These are temporary mock implementations - production should use secure backend APIs
 */

import { WalletAccount } from '@/types/wallet';

/**
 * Generates a mock BIP39 seed phrase for development
 * @returns {string} A 12-word seed phrase
 * @todo Replace with secure backend API call in production
 */
export const generateSeedPhrase = (): string => {
  // TODO: Call backend API for secure seed phrase generation
  // This is a mock implementation for development
  const mockWords = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid'
  ];
  
  const seedPhrase = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * mockWords.length);
    seedPhrase.push(mockWords[randomIndex]);
  }
  
  return seedPhrase.join(' ');
};

/**
 * Validates a BIP39 seed phrase format
 * @param {string} seedPhrase - The seed phrase to validate
 * @returns {boolean} True if valid format, false otherwise
 * @todo Replace with secure backend API validation in production
 */
export const validateSeedPhrase = (seedPhrase: string): boolean => {
  // TODO: Call backend API for secure validation
  // Mock validation - accepts any 12-word phrase
  const words = seedPhrase.trim().split(/\s+/);
  return words.length === 12 && words.every(word => word.length > 0);
};

/**
 * Creates a wallet keypair from a seed phrase (mock implementation)
 * @param {string} seedPhrase - The BIP39 seed phrase
 * @param {string} [derivationPath] - Optional derivation path
 * @returns {Object} Mock wallet keypair with public key and secret key
 * @todo Replace with backend API that only returns public key
 * @security The secret key should NEVER be returned from backend in production
 */
export const createWalletFromSeed = (seedPhrase: string, derivationPath?: string): { publicKey: { toBase58: () => string }, secretKey: Uint8Array } => {
  // TODO: This should call backend API and only return public key
  // Mock implementation for development
  return {
    publicKey: {
      toBase58: () => 'mock_public_key_' + Date.now()
    },
    secretKey: new Uint8Array(64) // This should NEVER be returned from backend
  };
};

/**
 * Saves wallet to localStorage (temporary development implementation)
 * @param {WalletAccount} wallet - The wallet account to save
 * @returns {void}
 * @todo Replace with secure backend API call
 * @security Current localStorage implementation is NOT secure for production
 */
export const saveWalletToStorage = (wallet: WalletAccount): void => {
  // TODO: Call backend API for secure wallet storage
  // Temporary localStorage for development - NOT secure
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = [...existingWallets, wallet];
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

/**
 * Retrieves wallets from localStorage (temporary development implementation)
 * @returns {WalletAccount[]} Array of wallet accounts
 * @todo Replace with secure backend API call
 * @security Current localStorage implementation is NOT secure for production
 */
export const getWalletsFromStorage = (): WalletAccount[] => {
  // TODO: Call backend API for secure wallet retrieval
  // Temporary localStorage for development - NOT secure
  const walletsData = localStorage.getItem('solana_wallets');
  return walletsData ? JSON.parse(walletsData) : [];
};

/**
 * Removes a wallet from localStorage (temporary development implementation)
 * @param {string} walletId - The ID of the wallet to remove
 * @returns {void}
 * @todo Replace with secure backend API call
 * @security Current localStorage implementation is NOT secure for production
 */
export const removeWalletFromStorage = (walletId: string): void => {
  // TODO: Call backend API for secure wallet deletion
  // Temporary localStorage for development - NOT secure
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = existingWallets.filter(wallet => wallet.id !== walletId);
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

/**
 * Formats a long address for display by showing start and end characters
 * @param {string} address - The full address to format
 * @returns {string} Formatted address with ellipsis in the middle
 */
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
