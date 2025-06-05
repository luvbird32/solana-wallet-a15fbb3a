
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Settings, Sparkles } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletHeaderProps {
  onShowWalletManagement: () => void;
}

const WalletHeader = ({ onShowWalletManagement }: WalletHeaderProps) => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-6xl font-black text-slate-800">
            Solana Wallet
          </h1>
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full animate-pulse shadow-lg relative ${
              connected ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-orange-400 shadow-orange-400/50'
            }`}>
              <div className={`absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-20 ${
                connected ? 'bg-emerald-400' : 'bg-orange-400'
              }`}></div>
            </div>
            <p className={`text-xl font-bold ${
              connected ? 'text-emerald-600' : 'text-orange-600'
            }`}>
              {connected ? '🟢 Wallet Connected' : '🟡 Wallet Not Connected'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={onShowWalletManagement}
          variant="outline"
          size="lg"
          className="bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100 backdrop-blur-md shadow-lg hover:shadow-xl font-bold px-6 py-6 rounded-2xl transition-all duration-300"
        >
          <Settings className="w-6 h-6 mr-2" />
          Wallet Management
        </Button>
        <WalletConnectionButton />
      </div>
    </div>
  );
};

export default WalletHeader;
