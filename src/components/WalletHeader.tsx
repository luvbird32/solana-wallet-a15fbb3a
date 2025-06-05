
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Settings } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletHeaderProps {
  onShowWalletManagement: () => void;
  onShowSmartContracts: () => void;
}

const WalletHeader = ({ onShowWalletManagement, onShowSmartContracts }: WalletHeaderProps) => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Wallet className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Solana Wallet</h1>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-2 h-2 rounded-full animate-pulse ${connected ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <p className={`text-sm font-medium ${connected ? 'text-green-600' : 'text-orange-600'}`}>
              {connected ? 'Wallet Connected' : 'Wallet Not Connected'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          onClick={onShowSmartContracts}
          variant="outline"
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Smart Contracts
        </Button>
        <Button
          onClick={onShowWalletManagement}
          variant="outline"
          className="border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Wallet Management
        </Button>
        <WalletConnectionButton />
      </div>
    </div>
  );
};

export default WalletHeader;
