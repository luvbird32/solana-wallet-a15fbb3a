
/**
 * @fileoverview Enhanced token service using CRUD operations
 * @description High-level token management with sanitization and security
 */

import { TokenCrudService, TokenModel } from './tokenCrudService';
import { TokenInfo } from '../../src/types/token';
import { checkRateLimit } from './securityService';

/**
 * Enhanced token service with full CRUD capabilities
 */
export class EnhancedTokenService {
  private static instance: EnhancedTokenService;
  private crudService: TokenCrudService;

  constructor() {
    this.crudService = TokenCrudService.getInstance();
  }

  static getInstance(): EnhancedTokenService {
    if (!EnhancedTokenService.instance) {
      EnhancedTokenService.instance = new EnhancedTokenService();
    }
    return EnhancedTokenService.instance;
  }

  /**
   * Searches for tokens with rate limiting and sanitization
   */
  async searchTokenByAddress(address: string, clientId: string = 'default'): Promise<TokenInfo | null> {
    try {
      // Check rate limit
      const rateCheck = checkRateLimit('TOKEN_SEARCH', clientId);
      if (!rateCheck.allowed) {
        throw new Error('Rate limit exceeded for token search');
      }

      const token = await this.crudService.findByAddress(address);
      if (!token) return null;

      return this.convertToTokenInfo(token);
    } catch (error) {
      console.error('Enhanced token search by address failed:', error);
      return null;
    }
  }

  /**
   * Searches for tokens by name with sanitization
   */
  async searchTokenByName(name: string, clientId: string = 'default'): Promise<TokenInfo[]> {
    try {
      // Check rate limit
      const rateCheck = checkRateLimit('TOKEN_SEARCH', clientId);
      if (!rateCheck.allowed) {
        throw new Error('Rate limit exceeded for token search');
      }

      const tokens = await this.crudService.findAll({ name });
      return tokens.map(token => this.convertToTokenInfo(token));
    } catch (error) {
      console.error('Enhanced token search by name failed:', error);
      return [];
    }
  }

  /**
   * Creates a new token with validation
   */
  async createToken(tokenData: Omit<TokenInfo, 'address'> & { address: string }): Promise<{success: boolean; token?: TokenInfo; error?: string}> {
    try {
      const modelData = {
        address: tokenData.address,
        symbol: tokenData.symbol,
        name: tokenData.name,
        decimals: tokenData.decimals,
        logoURI: tokenData.logoURI,
        verified: false
      };

      const token = await this.crudService.create(modelData);
      return { success: true, token: this.convertToTokenInfo(token) };
    } catch (error) {
      console.error('Enhanced token creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Updates a token with validation
   */
  async updateToken(tokenId: string, updates: Partial<TokenInfo>): Promise<{success: boolean; token?: TokenInfo; error?: string}> {
    try {
      const token = await this.crudService.update(tokenId, updates);
      return { success: true, token: this.convertToTokenInfo(token) };
    } catch (error) {
      console.error('Enhanced token update failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Deletes a token
   */
  async deleteToken(tokenId: string): Promise<{success: boolean; error?: string}> {
    try {
      const deleted = await this.crudService.delete(tokenId);
      if (deleted) {
        return { success: true };
      } else {
        return { success: false, error: 'Token not found' };
      }
    } catch (error) {
      console.error('Enhanced token deletion failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Lists all tokens with optional filtering
   */
  async getAllTokens(filters?: Record<string, any>): Promise<TokenInfo[]> {
    try {
      const tokens = await this.crudService.findAll(filters);
      return tokens.map(token => this.convertToTokenInfo(token));
    } catch (error) {
      console.error('Enhanced token listing failed:', error);
      return [];
    }
  }

  /**
   * Converts TokenModel to TokenInfo
   */
  private convertToTokenInfo(token: TokenModel): TokenInfo {
    return {
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI
    };
  }
}
