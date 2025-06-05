
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export interface ProgramInteraction {
  programId: string;
  method: string;
  accounts: string[];
  data?: Buffer;
}

export interface ContractCall {
  id: string;
  name: string;
  description: string;
  programId: string;
  method: string;
  requiredAccounts: string[];
  estimatedFee: number;
}

// Mock program interactions - in real app these would be actual program calls
export const mockPrograms: ContractCall[] = [
  {
    id: 'token-mint',
    name: 'Mint Tokens',
    description: 'Mint new tokens from a token program',
    programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    method: 'mintTo',
    requiredAccounts: ['mint', 'destination', 'authority'],
    estimatedFee: 0.001
  },
  {
    id: 'nft-create',
    name: 'Create NFT',
    description: 'Create a new NFT using Metaplex',
    programId: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    method: 'createMetadata',
    requiredAccounts: ['metadata', 'mint', 'authority'],
    estimatedFee: 0.01
  },
  {
    id: 'stake-sol',
    name: 'Stake SOL',
    description: 'Stake SOL to a validator',
    programId: 'Stake11111111111111111111111111111111111111',
    method: 'delegate',
    requiredAccounts: ['stake', 'vote', 'authority'],
    estimatedFee: 0.002
  }
];

export class SolanaContractManager {
  private connection: Connection;

  constructor(rpcUrl: string = 'https://api.devnet.solana.com') {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async callProgram(
    programInteraction: ProgramInteraction,
    payer: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ): Promise<string> {
    try {
      // Create a mock transaction for demonstration
      const transaction = new Transaction();
      
      // Add a simple system transfer as placeholder
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: payer,
          toPubkey: new PublicKey(programInteraction.programId),
          lamports: 0.001 * LAMPORTS_PER_SOL
        })
      );

      const { blockhash } = await this.connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = payer;

      // Sign transaction
      const signedTransaction = await signTransaction(transaction);
      
      // Send transaction
      const signature = await this.connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Wait for confirmation
      await this.connection.confirmTransaction(signature);
      
      return signature;
    } catch (error) {
      console.error('Program call failed:', error);
      throw error;
    }
  }

  async getProgramAccount(programId: string, accountPubkey: string) {
    try {
      const accountInfo = await this.connection.getAccountInfo(
        new PublicKey(accountPubkey)
      );
      return accountInfo;
    } catch (error) {
      console.error('Failed to fetch program account:', error);
      throw error;
    }
  }

  async getTokenBalance(tokenAccount: string): Promise<number> {
    try {
      const balance = await this.connection.getTokenAccountBalance(
        new PublicKey(tokenAccount)
      );
      return balance.value.uiAmount || 0;
    } catch (error) {
      console.error('Failed to get token balance:', error);
      return 0;
    }
  }
}

export const solanaContract = new SolanaContractManager();
