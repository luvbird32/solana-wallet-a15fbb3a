
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Power, Zap, Shield } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

const WalletConnectionButton = () => {
  const { connected, publicKey, connecting, connect, disconnect, walletName } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-emerald-50 border-2 border-emerald-200 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold text-sm">{walletName}</span>
            </div>
          </div>
          <p className="text-emerald-600 text-xs font-mono mt-1 bg-white/50 px-2 py-1 rounded-lg">
            {formatAddress(publicKey)}
          </p>
        </div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="default"
          className="bg-red-50 border-2 border-red-200 hover:border-red-300 text-red-600 hover:bg-red-100 transition-all duration-300 font-bold px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl"
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
      size="default"
      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 shadow-xl hover:shadow-2xl backdrop-blur-md font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.05] border-0"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {connecting ? (
        <>
          <Zap className="w-4 h-4 mr-2 animate-pulse" />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
};

export default WalletConnectionButton;
