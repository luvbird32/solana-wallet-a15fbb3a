
// Solana network configuration
export const SOLANA_NETWORKS = {
  MAINNET: {
    name: 'Mainnet Beta',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com'
  },
  TESTNET: {
    name: 'Testnet',
    rpcUrl: 'https://api.testnet.solana.com',
    explorerUrl: 'https://explorer.solana.com?cluster=testnet'
  },
  DEVNET: {
    name: 'Devnet',
    rpcUrl: 'https://api.devnet.solana.com',
    explorerUrl: 'https://explorer.solana.com?cluster=devnet'
  }
} as const;

// Security constants
export const SECURITY_CONFIG = {
  ENCRYPTION: {
    ALGORITHM: 'aes-256-gcm',
    KEY_LENGTH: 32,
    IV_LENGTH: 16,
    SALT_LENGTH: 32,
    TAG_LENGTH: 16
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SYMBOLS: true
  },
  SESSION: {
    TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
    REFRESH_THRESHOLD_MS: 5 * 60 * 1000 // 5 minutes
  }
} as const;

// Token standards and known addresses
export const TOKEN_STANDARDS = {
  SPL_TOKEN_PROGRAM: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  SPL_TOKEN_2022_PROGRAM: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  ASSOCIATED_TOKEN_PROGRAM: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
} as const;

// API rate limiting
export const RATE_LIMITS = {
  WALLET_CREATION: { requests: 5, windowMs: 60 * 1000 }, // 5 per minute
  TOKEN_SEARCH: { requests: 100, windowMs: 60 * 1000 }, // 100 per minute
  BALANCE_CHECK: { requests: 200, windowMs: 60 * 1000 } // 200 per minute
} as const;

// Error codes
export const ERROR_CODES = {
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  INVALID_SEED_PHRASE: 'INVALID_SEED_PHRASE',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  DECRYPTION_FAILED: 'DECRYPTION_FAILED'
} as const;
