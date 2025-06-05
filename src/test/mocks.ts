
import { vi } from 'vitest';

/**
 * Mock wallet provider for testing wallet-dependent components
 */
export const createMockWallet = (overrides: Partial<any> = {}) => ({
  connected: false,
  connecting: false,
  publicKey: null,
  walletName: 'Test Wallet',
  connect: vi.fn(),
  disconnect: vi.fn(),
  ...overrides,
});

/**
 * Mock Solana API responses for testing
 */
export const createMockSolanaAPI = (overrides: Partial<any> = {}) => ({
  balance: { sol: 0, usdValue: 0, change24h: 0 },
  tokens: [],
  loading: false,
  error: null,
  ...overrides,
});
