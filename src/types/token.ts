
/**
 * @fileoverview Type definitions for token-related data structures
 */

/**
 * Represents metadata and information about a blockchain token
 * @interface TokenInfo
 */
export interface TokenInfo {
  /** The unique blockchain address/mint of the token */
  address: string;
  /** The token's trading symbol (e.g., 'SOL', 'USDC') */
  symbol: string;
  /** The full human-readable name of the token */
  name: string;
  /** Number of decimal places the token uses */
  decimals: number;
  /** Optional URL to the token's logo image */
  logoURI?: string;
}
