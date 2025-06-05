
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Settings } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletHeaderProps {
  onShowWalletManagement: () => void;
}

const WalletHeader = ({ onShowWalletManagement }: WalletHeaderProps) => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-6">
        <div className="w-16 h-16 glass border border-white/30 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-foreground mb-2">Solana Wallet</h1>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${connected ? 'bg-success shadow-success/50' : 'bg-warning shadow-warning/50'}`}></div>
            <p className={`text-lg font-semibold ${connected ? 'text-success' : 'text-warning'}`}>
              {connected ? 'Wallet Connected' : 'Wallet Not Connected'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={onShowWalletManagement}
          variant="outline"
          size="lg"
          className="glass border border-white/30 hover:border-white/50 text-foreground hover:bg-white/20 backdrop-blur-md shadow-lg"
        >
          <Settings className="w-5 h-5 mr-2" />
          Wallet Management
        </Button>
        <WalletConnectionButton />
      </div>
    </div>
  );
};

export default WalletHeader;
