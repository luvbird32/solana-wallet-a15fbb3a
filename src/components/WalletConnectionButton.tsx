
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
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-bold text-lg">{walletName}</span>
            </div>
          </div>
          <p className="text-emerald-600 text-sm font-mono mt-2 bg-white/50 px-3 py-1 rounded-lg">
            {formatAddress(publicKey)}
          </p>
        </div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 hover:border-red-300 text-red-600 hover:bg-red-100 transition-all duration-300 font-bold px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl"
        >
          <Power className="w-5 h-5 mr-2" />
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
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl backdrop-blur-md font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.05] border-0"
    >
      <Wallet className="w-6 h-6 mr-3" />
      {connecting ? (
        <>
          <Zap className="w-5 h-5 mr-2 animate-pulse" />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
};

export default WalletConnectionButton;
