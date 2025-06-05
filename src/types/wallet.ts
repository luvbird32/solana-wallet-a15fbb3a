
export interface WalletAccount {
  id: string;
  name: string;
  publicKey: string;
  privateKey: string;
  seedPhrase?: string;
  createdAt: number;
}
