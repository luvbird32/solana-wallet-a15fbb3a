
/**
 * @fileoverview Type definitions for wallet account data structures
 */

/**
 * Represents a complete wallet account with all necessary information
 * @interface WalletAccount
 */
export interface WalletAccount {
  /** Unique identifier for this wallet */
  id: string;
  /** User-friendly name for the wallet */
  name: string;
  /** The wallet's public key (safe to share) */
  publicKey: string;
  /** The wallet's private key (must be kept secure) */
  privateKey: string;
  /** Optional BIP39 seed phrase for wallet recovery */
  seedPhrase?: string;
  /** Timestamp when the wallet was created */
  createdAt: number;
}
