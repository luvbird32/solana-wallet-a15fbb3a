
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  walletName: string | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [walletName, setWalletName] = useState<string | null>(null);

  const connect = async () => {
    setConnecting(true);
    try {
      // Check for Phantom wallet
      if ((window as any).phantom?.solana?.isPhantom) {
        const response = await (window as any).phantom.solana.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
        setWalletName('Phantom');
        localStorage.setItem('walletConnected', 'phantom');
        return;
      }

      // Check for Solflare
      if ((window as any).solflare?.isSolflare) {
        const response = await (window as any).solflare.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
        setWalletName('Solflare');
        localStorage.setItem('walletConnected', 'solflare');
        return;
      }

      // Check for Backpack
      if ((window as any).backpack?.isBackpack) {
        const response = await (window as any).backpack.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
        setWalletName('Backpack');
        localStorage.setItem('walletConnected', 'backpack');
        return;
      }

      // If no wallet found
      alert('No Solana wallet found. Please install Phantom, Solflare, or Backpack wallet extension.');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setPublicKey(null);
    setWalletName(null);
    localStorage.removeItem('walletConnected');
  };

  // Auto-connect on page load if previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('walletConnected');
    if (savedWallet) {
      // Small delay to ensure wallet extensions are loaded
      setTimeout(() => {
        connect();
      }, 1000);
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      connected,
      publicKey,
      connecting,
      connect,
      disconnect,
      walletName
    }}>
      {children}
    </WalletContext.Provider>
  );
};
