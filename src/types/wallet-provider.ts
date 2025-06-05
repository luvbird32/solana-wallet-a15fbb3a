
/**
 * @fileoverview Type definitions for wallet provider integrations
 */

/**
 * Response object from wallet provider connection
 * @interface WalletProviderResponse
 */
export interface WalletProviderResponse {
  /** The connected wallet's public key with utility methods */
  publicKey: {
    toString: () => string;
    toBase58?: () => string;
  };
}

/**
 * Interface for wallet provider implementations (Phantom, Solflare, etc.)
 * @interface WalletProvider
 */
export interface WalletProvider {
  /** Whether this is the Phantom wallet */
  isPhantom?: boolean;
  /** Whether this is the Solflare wallet */
  isSolflare?: boolean;
  /** Whether this is the Backpack wallet */
  isBackpack?: boolean;
  /** Method to initiate wallet connection */
  connect: () => Promise<WalletProviderResponse>;
}

/** Supported wallet provider names */
export type WalletProviderName = 'phantom' | 'solflare' | 'backpack';

/**
 * Props for wallet connection components
 * @interface WalletConnectionProps
 */
export interface WalletConnectionProps {
  /** Callback to show wallet management interface */
  onShowWalletManagement: () => void;
}

/**
 * Props for wallet header components
 * @interface WalletHeaderProps
 */
export interface WalletHeaderProps {
  /** Callback to show wallet management interface */
  onShowWalletManagement: () => void;
}
