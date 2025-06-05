
/**
 * @fileoverview Wallet data models and repository interfaces
 * @description Defines the data structures and database operations for wallet management
 * including encryption, storage, and retrieval of wallet information
 */

/**
 * Core wallet model representing stored wallet data
 * @interface WalletModel
 */
export interface WalletModel {
  /** Unique identifier for the wallet */
  id: string;
  /** User-friendly name for the wallet */
  name: string;
  /** The wallet's public key (safe to store and share) */
  publicKey: string;
  /** Encrypted private key (requires master password to decrypt) */
  encryptedPrivateKey: string;
  /** Optional encrypted seed phrase (requires master password to decrypt) */
  encryptedSeedPhrase?: string;
  /** HD wallet derivation path used to generate this wallet */
  derivationPath: string;
  /** Unix timestamp when the wallet was created */
  createdAt: number;
  /** Unix timestamp when the wallet was last modified */
  updatedAt: number;
  /** Whether this wallet is currently active/enabled */
  isActive: boolean;
  /** Additional metadata for extensibility */
  metadata?: Record<string, any>;
}

/**
 * Wallet balance information with token holdings
 * @interface WalletBalance
 */
export interface WalletBalance {
  /** The wallet ID this balance belongs to */
  walletId: string;
  /** Total SOL balance in lamports */
  balance: number;
  /** USD value of the total wallet balance */
  usdValue: number;
  /** Unix timestamp when balance was last updated */
  lastUpdated: number;
  /** Array of token balances held by this wallet */
  tokens: TokenBalance[];
}

/**
 * Individual token balance within a wallet
 * @interface TokenBalance
 */
export interface TokenBalance {
  /** The token's mint address */
  tokenAddress: string;
  /** Token balance in smallest units (considering decimals) */
  balance: number;
  /** Number of decimal places this token uses */
  decimals: number;
  /** Optional USD value of this token holding */
  usdValue?: number;
  /** Optional token symbol (e.g., 'USDC', 'SOL') */
  symbol?: string;
  /** Optional human-readable token name */
  name?: string;
}

/**
 * Repository interface for wallet database operations
 * @interface WalletRepository
 * @description Defines the contract for wallet data persistence operations
 */
export interface WalletRepository {
  /**
   * Creates a new wallet in the database
   * @param {WalletModel} wallet - The wallet data to store
   * @returns {Promise<WalletModel>} The created wallet with generated timestamps
   */
  create(wallet: WalletModel): Promise<WalletModel>;
  
  /**
   * Finds a wallet by its unique ID
   * @param {string} id - The wallet ID to search for
   * @returns {Promise<WalletModel | null>} The wallet if found, null otherwise
   */
  findById(id: string): Promise<WalletModel | null>;
  
  /**
   * Finds a wallet by its public key
   * @param {string} publicKey - The public key to search for
   * @returns {Promise<WalletModel | null>} The wallet if found, null otherwise
   */
  findByPublicKey(publicKey: string): Promise<WalletModel | null>;
  
  /**
   * Updates an existing wallet with new data
   * @param {string} id - The wallet ID to update
   * @param {Partial<WalletModel>} updates - The fields to update
   * @returns {Promise<WalletModel>} The updated wallet data
   */
  update(id: string, updates: Partial<WalletModel>): Promise<WalletModel>;
  
  /**
   * Deletes a wallet from the database
   * @param {string} id - The wallet ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  delete(id: string): Promise<boolean>;
  
  /**
   * Finds all wallets belonging to a specific user
   * @param {string} userId - The user ID to search for
   * @returns {Promise<WalletModel[]>} Array of user's wallets
   */
  findByUserId(userId: string): Promise<WalletModel[]>;
}

/**
 * Mock implementation of WalletRepository for development and testing
 * @class MockWalletRepository
 * @implements {WalletRepository}
 * @description Provides in-memory storage for wallet data during development.
 * Should be replaced with actual database implementation in production.
 */
export class MockWalletRepository implements WalletRepository {
  /** In-memory storage for wallet data */
  private wallets: Map<string, WalletModel> = new Map();

  /**
   * Creates a new wallet in memory storage
   * @param {WalletModel} wallet - The wallet to create
   * @returns {Promise<WalletModel>} The created wallet with timestamps
   */
  async create(wallet: WalletModel): Promise<WalletModel> {
    this.wallets.set(wallet.id, { ...wallet, createdAt: Date.now(), updatedAt: Date.now() });
    return wallet;
  }

  /**
   * Finds a wallet by ID in memory storage
   * @param {string} id - The wallet ID to find
   * @returns {Promise<WalletModel | null>} The wallet or null if not found
   */
  async findById(id: string): Promise<WalletModel | null> {
    return this.wallets.get(id) || null;
  }

  /**
   * Finds a wallet by public key in memory storage
   * @param {string} publicKey - The public key to search for
   * @returns {Promise<WalletModel | null>} The wallet or null if not found
   */
  async findByPublicKey(publicKey: string): Promise<WalletModel | null> {
    for (const wallet of this.wallets.values()) {
      if (wallet.publicKey === publicKey) {
        return wallet;
      }
    }
    return null;
  }

  /**
   * Updates a wallet in memory storage
   * @param {string} id - The wallet ID to update
   * @param {Partial<WalletModel>} updates - The updates to apply
   * @returns {Promise<WalletModel>} The updated wallet
   * @throws {Error} If wallet is not found
   */
  async update(id: string, updates: Partial<WalletModel>): Promise<WalletModel> {
    const existing = this.wallets.get(id);
    if (!existing) {
      throw new Error('Wallet not found');
    }
    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    this.wallets.set(id, updated);
    return updated;
  }

  /**
   * Deletes a wallet from memory storage
   * @param {string} id - The wallet ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async delete(id: string): Promise<boolean> {
    return this.wallets.delete(id);
  }

  /**
   * Finds all wallets for a user (mock implementation)
   * @param {string} userId - The user ID to search for
   * @returns {Promise<WalletModel[]>} Array of all wallets (mock data)
   * @todo Implement proper user-wallet relationships when backend is ready
   */
  async findByUserId(userId: string): Promise<WalletModel[]> {
    // TODO: Implement user-wallet relationships when backend is implemented
    return Array.from(this.wallets.values());
  }
}
