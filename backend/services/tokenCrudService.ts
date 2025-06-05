
/**
 * @fileoverview Token-specific CRUD service with sanitization
 * @description Implements secure token management with full CRUD operations
 */

import { BaseCrudService } from './crudService';
import { sanitizeAddress, sanitizeTokenSymbol, sanitizeString, sanitizeNumber } from '../utils/sanitization';

/**
 * Token information model
 */
export interface TokenModel {
  id: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  verified: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * Mock token repository for development
 */
class MockTokenRepository {
  private tokens: Map<string, TokenModel> = new Map();
  private nextId = 1;

  async create(data: Omit<TokenModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<TokenModel> {
    const now = Date.now();
    const token: TokenModel = {
      ...data,
      id: this.nextId++.toString(),
      createdAt: now,
      updatedAt: now
    };
    this.tokens.set(token.id, token);
    return token;
  }

  async findById(id: string): Promise<TokenModel | null> {
    return this.tokens.get(id) || null;
  }

  async findAll(filters?: Record<string, any>): Promise<TokenModel[]> {
    let results = Array.from(this.tokens.values());
    
    if (filters) {
      if (filters.symbol) {
        results = results.filter(t => t.symbol.toLowerCase().includes(filters.symbol.toLowerCase()));
      }
      if (filters.name) {
        results = results.filter(t => t.name.toLowerCase().includes(filters.name.toLowerCase()));
      }
      if (filters.verified !== undefined) {
        results = results.filter(t => t.verified === filters.verified);
      }
    }
    
    return results;
  }

  async update(id: string, updates: Partial<TokenModel>): Promise<TokenModel> {
    const existing = this.tokens.get(id);
    if (!existing) {
      throw new Error('Token not found');
    }
    
    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    this.tokens.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.tokens.delete(id);
  }

  async findByAddress(address: string): Promise<TokenModel | null> {
    for (const token of this.tokens.values()) {
      if (token.address === address) {
        return token;
      }
    }
    return null;
  }
}

/**
 * Token-specific CRUD service with enhanced security
 */
export class TokenCrudService extends BaseCrudService<TokenModel> {
  private static instance: TokenCrudService;
  private mockRepo: MockTokenRepository;
  
  constructor() {
    const mockRepo = new MockTokenRepository();
    super(mockRepo);
    this.mockRepo = mockRepo;
  }

  /**
   * Gets singleton instance of token CRUD service
   */
  static getInstance(): TokenCrudService {
    if (!TokenCrudService.instance) {
      TokenCrudService.instance = new TokenCrudService();
    }
    return TokenCrudService.instance;
  }

  /**
   * Sanitizes token creation data
   */
  protected async sanitizeCreateData(data: any): Promise<Partial<TokenModel>> {
    return {
      address: sanitizeAddress(data.address),
      symbol: sanitizeTokenSymbol(data.symbol),
      name: sanitizeString(data.name, { maxLength: 100, allowWhitespace: true }),
      decimals: sanitizeNumber(data.decimals, { min: 0, max: 18, integer: true }),
      logoURI: data.logoURI ? sanitizeString(data.logoURI, { maxLength: 500 }) : undefined,
      verified: Boolean(data.verified || false)
    };
  }

  /**
   * Sanitizes token update data
   */
  protected async sanitizeUpdateData(data: any): Promise<Partial<TokenModel>> {
    const sanitized: Partial<TokenModel> = {};

    if (data.address !== undefined) {
      sanitized.address = sanitizeAddress(data.address);
    }

    if (data.symbol !== undefined) {
      sanitized.symbol = sanitizeTokenSymbol(data.symbol);
    }

    if (data.name !== undefined) {
      sanitized.name = sanitizeString(data.name, { maxLength: 100, allowWhitespace: true });
    }

    if (data.decimals !== undefined) {
      sanitized.decimals = sanitizeNumber(data.decimals, { min: 0, max: 18, integer: true });
    }

    if (data.logoURI !== undefined) {
      sanitized.logoURI = data.logoURI ? sanitizeString(data.logoURI, { maxLength: 500 }) : undefined;
    }

    if (data.verified !== undefined) {
      sanitized.verified = Boolean(data.verified);
    }

    return sanitized;
  }

  /**
   * Sanitizes search filters
   */
  protected async sanitizeFilters(filters: Record<string, any>): Promise<Record<string, any>> {
    const sanitized: Record<string, any> = {};

    if (filters.symbol) {
      sanitized.symbol = sanitizeString(filters.symbol, { maxLength: 10 });
    }

    if (filters.name) {
      sanitized.name = sanitizeString(filters.name, { maxLength: 100 });
    }

    if (filters.verified !== undefined) {
      sanitized.verified = Boolean(filters.verified);
    }

    return sanitized;
  }

  /**
   * Validates token creation data
   */
  protected async validateCreateData(data: any): Promise<void> {
    if (!data.address) {
      throw new Error('Token address is required');
    }

    if (!data.symbol) {
      throw new Error('Token symbol is required');
    }

    if (!data.name) {
      throw new Error('Token name is required');
    }

    if (data.decimals === undefined || data.decimals === null) {
      throw new Error('Token decimals are required');
    }

    // Check for duplicate address
    const existing = await this.mockRepo.findByAddress(data.address);
    if (existing) {
      throw new Error('Token with this address already exists');
    }
  }

  /**
   * Validates token update data
   */
  protected async validateUpdateData(data: any): Promise<void> {
    if (data.address !== undefined) {
      // Check for duplicate address (excluding current token)
      const existing = await this.mockRepo.findByAddress(data.address);
      if (existing) {
        throw new Error('Another token with this address already exists');
      }
    }

    if (data.symbol !== undefined && (!data.symbol || data.symbol.length < 1)) {
      throw new Error('Token symbol cannot be empty');
    }

    if (data.name !== undefined && (!data.name || data.name.length < 1)) {
      throw new Error('Token name cannot be empty');
    }
  }

  /**
   * Finds token by address with sanitization
   * @param {string} address - Token address
   * @returns {Promise<TokenModel | null>} Found token or null
   */
  async findByAddress(address: string): Promise<TokenModel | null> {
    try {
      const sanitizedAddress = sanitizeAddress(address);
      return await this.mockRepo.findByAddress(sanitizedAddress);
    } catch (error) {
      console.error('Find by address operation failed:', error);
      throw new Error(`Failed to find token by address: ${error.message}`);
    }
  }
}
