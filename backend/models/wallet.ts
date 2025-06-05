
export interface WalletModel {
  id: string;
  name: string;
  publicKey: string;
  encryptedPrivateKey: string;
  encryptedSeedPhrase?: string;
  derivationPath: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface WalletBalance {
  walletId: string;
  balance: number;
  usdValue: number;
  lastUpdated: number;
  tokens: TokenBalance[];
}

export interface TokenBalance {
  tokenAddress: string;
  balance: number;
  decimals: number;
  usdValue?: number;
  symbol?: string;
  name?: string;
}

// Database operations interface (to be implemented with actual DB)
export interface WalletRepository {
  create(wallet: WalletModel): Promise<WalletModel>;
  findById(id: string): Promise<WalletModel | null>;
  findByPublicKey(publicKey: string): Promise<WalletModel | null>;
  update(id: string, updates: Partial<WalletModel>): Promise<WalletModel>;
  delete(id: string): Promise<boolean>;
  findByUserId(userId: string): Promise<WalletModel[]>;
}

// Mock repository implementation
export class MockWalletRepository implements WalletRepository {
  private wallets: Map<string, WalletModel> = new Map();

  async create(wallet: WalletModel): Promise<WalletModel> {
    this.wallets.set(wallet.id, { ...wallet, createdAt: Date.now(), updatedAt: Date.now() });
    return wallet;
  }

  async findById(id: string): Promise<WalletModel | null> {
    return this.wallets.get(id) || null;
  }

  async findByPublicKey(publicKey: string): Promise<WalletModel | null> {
    for (const wallet of this.wallets.values()) {
      if (wallet.publicKey === publicKey) {
        return wallet;
      }
    }
    return null;
  }

  async update(id: string, updates: Partial<WalletModel>): Promise<WalletModel> {
    const existing = this.wallets.get(id);
    if (!existing) {
      throw new Error('Wallet not found');
    }
    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    this.wallets.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.wallets.delete(id);
  }

  async findByUserId(userId: string): Promise<WalletModel[]> {
    // TODO: Implement user-wallet relationships when backend is implemented
    return Array.from(this.wallets.values());
  }
}
