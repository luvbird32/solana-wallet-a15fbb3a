
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
      <div className="flex items-center space-x-3">
        <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 font-medium text-sm">{walletName}</span>
          </div>
          <p className="text-green-600 text-xs font-mono">{formatAddress(publicKey)}</p>
        </div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="sm"
          className="border-red-200 text-red-600 hover:bg-red-50"
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
      className="wallet-button"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectionButton;
