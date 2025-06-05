
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { WalletAccount } from '@/types/wallet';

export const generateSeedPhrase = (): string => {
  return bip39.generateMnemonic();
};

export const validateSeedPhrase = (seedPhrase: string): boolean => {
  return bip39.validateMnemonic(seedPhrase);
};

export const createWalletFromSeed = (seedPhrase: string, derivationPath: string = "m/44'/501'/0'/0'"): Keypair => {
  const seed = bip39.mnemonicToSeedSync(seedPhrase);
  const derivedSeed = derivePath(derivationPath, seed.toString('hex')).key;
  return Keypair.fromSeed(derivedSeed);
};

export const saveWalletToStorage = (wallet: WalletAccount): void => {
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = [...existingWallets, wallet];
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

export const getWalletsFromStorage = (): WalletAccount[] => {
  const walletsData = localStorage.getItem('solana_wallets');
  return walletsData ? JSON.parse(walletsData) : [];
};

export const removeWalletFromStorage = (walletId: string): void => {
  const existingWallets = getWalletsFromStorage();
  const updatedWallets = existingWallets.filter(wallet => wallet.id !== walletId);
  localStorage.setItem('solana_wallets', JSON.stringify(updatedWallets));
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
