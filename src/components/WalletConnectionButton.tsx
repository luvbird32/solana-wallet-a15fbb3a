
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Power } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

const WalletConnectionButton = () => {
  const { connected, publicKey, connecting, connect, disconnect, walletName } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center space-x-4">
        <div className="bg-success-light border-2 border-success/20 px-6 py-3 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full shadow-lg shadow-success/50 animate-pulse"></div>
            <span className="text-success font-bold">{walletName}</span>
          </div>
          <p className="text-success/80 text-sm font-mono mt-1">{formatAddress(publicKey)}</p>
        </div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="lg"
          className="border-2 border-error/20 text-error hover:bg-error-light hover:border-error/40 transition-all duration-300"
        >
          <Power className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      disabled={connecting}
      size="lg"
      className="wallet-button text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
    >
      <Wallet className="w-5 h-5 mr-3" />
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectionButton;
