
import { WalletAccount } from '@/types/wallet';

// Frontend mock implementations - these would call backend APIs in production
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

export const validateSeedPhrase = (seedPhrase: string): boolean => {
  // TODO: Call backend API for secure validation
  // Mock validation - accepts any 12-word phrase
  const words = seedPhrase.trim().split(/\s+/);
  return words.length === 12 && words.every(word => word.length > 0);
};

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

export const saveWalletToStorage = (wallet: WalletAccount): void => {
  // TODO: Call backend API for secure wallet storage
  // Temporary localStorage for development - NOT secure
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = [...existingWallets, wallet];
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

export const getWalletsFromStorage = (): WalletAccount[] => {
  // TODO: Call backend API for secure wallet retrieval
  // Temporary localStorage for development - NOT secure
  const walletsData = localStorage.getItem('solana_wallets');
  return walletsData ? JSON.parse(walletsData) : [];
};

export const removeWalletFromStorage = (walletId: string): void => {
  // TODO: Call backend API for secure wallet deletion
  // Temporary localStorage for development - NOT secure
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = existingWallets.filter(wallet => wallet.id !== walletId);
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
