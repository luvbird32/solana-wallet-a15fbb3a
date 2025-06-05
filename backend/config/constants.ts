
/**
 * @fileoverview Backend configuration constants and network settings
 * @description Centralized configuration for Solana networks, security settings,
 * token standards, API limits, and error codes used throughout the backend
 */

/**
 * Solana network configuration with RPC endpoints and explorer URLs
 * @constant SOLANA_NETWORKS
 * @description Defines connection details for different Solana network environments
 */
export const SOLANA_NETWORKS = {
  /** Mainnet Beta network configuration for production use */
  MAINNET: {
    name: 'Mainnet Beta',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com'
  },
  /** Testnet network configuration for integration testing */
  TESTNET: {
    name: 'Testnet',
    rpcUrl: 'https://api.testnet.solana.com',
    explorerUrl: 'https://explorer.solana.com?cluster=testnet'
  },
  /** Devnet network configuration for development */
  DEVNET: {
    name: 'Devnet',
    rpcUrl: 'https://api.devnet.solana.com',
    explorerUrl: 'https://explorer.solana.com?cluster=devnet'
  }
} as const;

/**
 * API rate limiting configuration for different operations
 * @constant RATE_LIMITS
 * @description Defines rate limits to prevent abuse and ensure fair usage
 */
export const RATE_LIMITS = {
  /** Rate limit for wallet creation operations */
  WALLET_CREATION: { requests: 5, windowMs: 60 * 1000 }, // 5 per minute
  /** Rate limit for token search operations */
  TOKEN_SEARCH: { requests: 100, windowMs: 60 * 1000 }, // 100 per minute
  /** Rate limit for balance check operations */
  BALANCE_CHECK: { requests: 200, windowMs: 60 * 1000 } // 200 per minute
} as const;

/**
 * Security configuration constants for encryption and authentication
 * @constant SECURITY_CONFIG
 * @description Defines security parameters for encryption, passwords, and sessions
 */
export const SECURITY_CONFIG = {
  /** Encryption algorithm and key parameters */
  ENCRYPTION: {
    /** AES encryption algorithm with Galois/Counter Mode */
    ALGORITHM: 'aes-256-gcm',
    /** Encryption key length in bytes */
    KEY_LENGTH: 32,
    /** Initialization vector length in bytes */
    IV_LENGTH: 16,
    /** Salt length for key derivation in bytes */
    SALT_LENGTH: 32,
    /** Authentication tag length in bytes */
    TAG_LENGTH: 16
  },
  /** Password complexity requirements */
  PASSWORD: {
    /** Minimum password length */
    MIN_LENGTH: 8,
    /** Require at least one uppercase letter */
    REQUIRE_UPPERCASE: true,
    /** Require at least one lowercase letter */
    REQUIRE_LOWERCASE: true,
    /** Require at least one numeric digit */
    REQUIRE_NUMBERS: true,
    /** Require at least one special character */
    REQUIRE_SYMBOLS: true
  },
  /** Session management configuration */
  SESSION: {
    /** Session timeout in milliseconds (30 minutes) */
    TIMEOUT_MS: 30 * 60 * 1000,
    /** Time before expiration to trigger refresh (5 minutes) */
    REFRESH_THRESHOLD_MS: 5 * 60 * 1000
  },
  /** Rate limiting configuration */
  RATE_LIMITS
} as const;

/**
 * Solana token standards and well-known program addresses
 * @constant TOKEN_STANDARDS
 * @description Standard program addresses for Solana token operations
 */
export const TOKEN_STANDARDS = {
  /** Original SPL Token Program address */
  SPL_TOKEN_PROGRAM: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  /** SPL Token 2022 Program address with extended features */
  SPL_TOKEN_2022_PROGRAM: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  /** Associated Token Account Program address */
  ASSOCIATED_TOKEN_PROGRAM: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
} as const;

/**
 * Standardized error codes for consistent error handling
 * @constant ERROR_CODES
 * @description Defines error codes used throughout the application for consistent error handling
 */
export const ERROR_CODES = {
  /** Wallet with specified ID was not found */
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  /** Provided seed phrase is invalid or malformed */
  INVALID_SEED_PHRASE: 'INVALID_SEED_PHRASE',
  /** Address format is invalid for the specified blockchain */
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  /** Account balance is insufficient for the requested operation */
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  /** Network connectivity or RPC error occurred */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** API rate limit has been exceeded */
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  /** Encryption operation failed */
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  /** Decryption operation failed (possibly wrong password) */
  DECRYPTION_FAILED: 'DECRYPTION_FAILED'
} as const;
