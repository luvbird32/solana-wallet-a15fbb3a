
/**
 * @fileoverview Type definitions for transaction-related data structures
 */

/**
 * Represents a blockchain transaction with all relevant details
 * @interface Transaction
 */
export interface Transaction {
  /** Unique identifier for the transaction */
  id: string;
  /** Type of transaction performed */
  type: 'send' | 'receive' | 'swap';
  /** Amount of tokens involved in the transaction */
  amount: number;
  /** Symbol of the token being transacted */
  token: string;
  /** Address or identifier of the counterparty */
  toFrom: string;
  /** When the transaction occurred */
  timestamp: Date;
  /** Current status of the transaction */
  status: 'confirmed' | 'pending' | 'failed';
}

/** Union type for transaction types */
export type TransactionType = Transaction['type'];

/** Union type for transaction statuses */
export type TransactionStatus = Transaction['status'];
