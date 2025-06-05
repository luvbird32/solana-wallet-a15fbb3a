
export interface WalletProviderResponse {
  publicKey: {
    toString: () => string;
    toBase58?: () => string;
  };
}

export interface WalletProvider {
  isPhantom?: boolean;
  isSolflare?: boolean;
  isBackpack?: boolean;
  connect: () => Promise<WalletProviderResponse>;
}

export type WalletProviderName = 'phantom' | 'solflare' | 'backpack';

export interface WalletConnectionProps {
  onShowWalletManagement: () => void;
}

export interface WalletHeaderProps {
  onShowWalletManagement: () => void;
}
