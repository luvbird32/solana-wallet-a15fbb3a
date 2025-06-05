
/**
 * @fileoverview Wallet-specific CRUD service with sanitization
 * @description Implements secure wallet management with full CRUD operations
 */

import { BaseCrudService } from './crudService';
import { WalletModel, MockWalletRepository } from '../models/wallet';
import { sanitizeWalletName, sanitizeAddress, sanitizeString } from '../utils/sanitization';

/**
 * Wallet-specific CRUD service with enhanced security
 */
export class WalletCrudService extends BaseCrudService<WalletModel> {
  private static instance: WalletCrudService;
  
  constructor() {
    super(new MockWalletRepository());
  }

  /**
   * Gets singleton instance of wallet CRUD service
   */
  static getInstance(): WalletCrudService {
    if (!WalletCrudService.instance) {
      WalletCrudService.instance = new WalletCrudService();
    }
    return WalletCrudService.instance;
  }

  /**
   * Sanitizes wallet creation data
   */
  protected async sanitizeCreateData(data: any): Promise<Partial<WalletModel>> {
    return {
      name: sanitizeWalletName(data.name),
      publicKey: sanitizeAddress(data.publicKey),
      encryptedPrivateKey: sanitizeString(data.encryptedPrivateKey || '', { maxLength: 500 }),
      encryptedSeedPhrase: data.encryptedSeedPhrase ? 
        sanitizeString(data.encryptedSeedPhrase, { maxLength: 1000 }) : undefined,
      derivationPath: sanitizeString(data.derivationPath || "m/44'/501'/0'/0'", { maxLength: 50 }),
      isActive: Boolean(data.isActive !== undefined ? data.isActive : true),
      metadata: data.metadata || {}
    };
  }

  /**
   * Sanitizes wallet update data
   */
  protected async sanitizeUpdateData(data: any): Promise<Partial<WalletModel>> {
    const sanitized: Partial<WalletModel> = {};

    if (data.name !== undefined) {
      sanitized.name = sanitizeWalletName(data.name);
    }

    if (data.publicKey !== undefined) {
      sanitized.publicKey = sanitizeAddress(data.publicKey);
    }

    if (data.encryptedPrivateKey !== undefined) {
      sanitized.encryptedPrivateKey = sanitizeString(data.encryptedPrivateKey, { maxLength: 500 });
    }

    if (data.encryptedSeedPhrase !== undefined) {
      sanitized.encryptedSeedPhrase = sanitizeString(data.encryptedSeedPhrase, { maxLength: 1000 });
    }

    if (data.derivationPath !== undefined) {
      sanitized.derivationPath = sanitizeString(data.derivationPath, { maxLength: 50 });
    }

    if (data.isActive !== undefined) {
      sanitized.isActive = Boolean(data.isActive);
    }

    if (data.metadata !== undefined) {
      sanitized.metadata = data.metadata;
    }

    return sanitized;
  }

  /**
   * Sanitizes search filters
   */
  protected async sanitizeFilters(filters: Record<string, any>): Promise<Record<string, any>> {
    const sanitized: Record<string, any> = {};

    if (filters.name) {
      sanitized.name = sanitizeString(filters.name, { maxLength: 50 });
    }

    if (filters.publicKey) {
      sanitized.publicKey = sanitizeAddress(filters.publicKey);
    }

    if (filters.isActive !== undefined) {
      sanitized.isActive = Boolean(filters.isActive);
    }

    return sanitized;
  }

  /**
   * Validates wallet creation data
   */
  protected async validateCreateData(data: any): Promise<void> {
    if (!data.name || data.name.length < 1) {
      throw new Error('Wallet name is required');
    }

    if (!data.publicKey) {
      throw new Error('Public key is required');
    }

    // Check for duplicate public key
    const existing = await this.repository.findByPublicKey(data.publicKey);
    if (existing) {
      throw new Error('Wallet with this public key already exists');
    }
  }

  /**
   * Validates wallet update data
   */
  protected async validateUpdateData(data: any): Promise<void> {
    if (data.name !== undefined && (!data.name || data.name.length < 1)) {
      throw new Error('Wallet name cannot be empty');
    }

    if (data.publicKey !== undefined) {
      // Check for duplicate public key (excluding current wallet)
      const existing = await this.repository.findByPublicKey(data.publicKey);
      if (existing) {
        throw new Error('Another wallet with this public key already exists');
      }
    }
  }

  /**
   * Finds wallets by user ID with sanitization
   * @param {string} userId - User ID
   * @returns {Promise<WalletModel[]>} User's wallets
   */
  async findByUserId(userId: string): Promise<WalletModel[]> {
    try {
      const sanitizedUserId = sanitizeString(userId, { alphanumericOnly: true, maxLength: 50 });
      if (!sanitizedUserId) {
        throw new Error('Invalid user ID provided');
      }
      return await this.repository.findByUserId(sanitizedUserId);
    } catch (error) {
      console.error('Find by user ID operation failed:', error);
      throw new Error(`Failed to find user wallets: ${error.message}`);
    }
  }

  /**
   * Finds wallet by public key with sanitization
   * @param {string} publicKey - Wallet public key
   * @returns {Promise<WalletModel | null>} Found wallet or null
   */
  async findByPublicKey(publicKey: string): Promise<WalletModel | null> {
    try {
      const sanitizedKey = sanitizeAddress(publicKey);
      return await this.repository.findByPublicKey(sanitizedKey);
    } catch (error) {
      console.error('Find by public key operation failed:', error);
      throw new Error(`Failed to find wallet by public key: ${error.message}`);
    }
  }
}
