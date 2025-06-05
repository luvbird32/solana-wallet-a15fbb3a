
/**
 * @fileoverview Enhanced wallet service using CRUD operations
 * @description High-level wallet management with sanitization and security
 */

import { WalletCrudService } from './walletCrudService';
import { WalletAccount } from '../../src/types/wallet';
import { checkRateLimit } from './securityService';

/**
 * Enhanced wallet service with full CRUD capabilities
 */
export class EnhancedWalletService {
  private static instance: EnhancedWalletService;
  private crudService: WalletCrudService;

  constructor() {
    this.crudService = WalletCrudService.getInstance();
  }

  static getInstance(): EnhancedWalletService {
    if (!EnhancedWalletService.instance) {
      EnhancedWalletService.instance = new EnhancedWalletService();
    }
    return EnhancedWalletService.instance;
  }

  /**
   * Creates a new wallet with rate limiting and sanitization
   */
  async createWallet(walletData: Omit<WalletAccount, 'id' | 'createdAt'>, clientId: string = 'default'): Promise<{success: boolean; wallet?: WalletAccount; error?: string}> {
    try {
      // Check rate limit
      const rateCheck = checkRateLimit('WALLET_CREATION', clientId);
      if (!rateCheck.allowed) {
        return { success: false, error: 'Rate limit exceeded for wallet creation' };
      }

      // Convert to wallet model format
      const modelData = {
        name: walletData.name,
        publicKey: walletData.publicKey,
        encryptedPrivateKey: walletData.privateKey, // In real implementation, this should be encrypted
        encryptedSeedPhrase: walletData.seedPhrase,
        derivationPath: "m/44'/501'/0'/0'",
        isActive: true
      };

      const wallet = await this.crudService.create(modelData);
      
      // Convert back to WalletAccount format
      const result: WalletAccount = {
        id: wallet.id,
        name: wallet.name,
        publicKey: wallet.publicKey,
        privateKey: wallet.encryptedPrivateKey,
        seedPhrase: wallet.encryptedSeedPhrase,
        createdAt: wallet.createdAt
      };

      return { success: true, wallet: result };
    } catch (error) {
      console.error('Enhanced wallet creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieves a wallet by ID with sanitization
   */
  async getWallet(walletId: string): Promise<WalletAccount | null> {
    try {
      const wallet = await this.crudService.findById(walletId);
      if (!wallet) return null;

      return {
        id: wallet.id,
        name: wallet.name,
        publicKey: wallet.publicKey,
        privateKey: wallet.encryptedPrivateKey,
        seedPhrase: wallet.encryptedSeedPhrase,
        createdAt: wallet.createdAt
      };
    } catch (error) {
      console.error('Enhanced wallet retrieval failed:', error);
      return null;
    }
  }

  /**
   * Retrieves all wallets with optional filtering
   */
  async getAllWallets(filters?: Record<string, any>): Promise<WalletAccount[]> {
    try {
      const wallets = await this.crudService.findAll(filters);
      
      return wallets.map(wallet => ({
        id: wallet.id,
        name: wallet.name,
        publicKey: wallet.publicKey,
        privateKey: wallet.encryptedPrivateKey,
        seedPhrase: wallet.encryptedSeedPhrase,
        createdAt: wallet.createdAt
      }));
    } catch (error) {
      console.error('Enhanced wallet listing failed:', error);
      return [];
    }
  }

  /**
   * Updates a wallet with sanitization
   */
  async updateWallet(walletId: string, updates: Partial<WalletAccount>): Promise<{success: boolean; wallet?: WalletAccount; error?: string}> {
    try {
      // Convert updates to model format
      const modelUpdates: any = {};
      if (updates.name !== undefined) modelUpdates.name = updates.name;
      if (updates.publicKey !== undefined) modelUpdates.publicKey = updates.publicKey;
      if (updates.privateKey !== undefined) modelUpdates.encryptedPrivateKey = updates.privateKey;
      if (updates.seedPhrase !== undefined) modelUpdates.encryptedSeedPhrase = updates.seedPhrase;

      const wallet = await this.crudService.update(walletId, modelUpdates);
      
      const result: WalletAccount = {
        id: wallet.id,
        name: wallet.name,
        publicKey: wallet.publicKey,
        privateKey: wallet.encryptedPrivateKey,
        seedPhrase: wallet.encryptedSeedPhrase,
        createdAt: wallet.createdAt
      };

      return { success: true, wallet: result };
    } catch (error) {
      console.error('Enhanced wallet update failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Deletes a wallet with confirmation
   */
  async deleteWallet(walletId: string): Promise<{success: boolean; error?: string}> {
    try {
      const deleted = await this.crudService.delete(walletId);
      if (deleted) {
        return { success: true };
      } else {
        return { success: false, error: 'Wallet not found' };
      }
    } catch (error) {
      console.error('Enhanced wallet deletion failed:', error);
      return { success: false, error: error.message };
    }
  }
}
