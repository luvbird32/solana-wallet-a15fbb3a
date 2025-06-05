
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletConnectionPromptProps {
  onShowWalletManagement: () => void;
}

const WalletConnectionPrompt = ({ onShowWalletManagement }: WalletConnectionPromptProps) => {
  return (
    <Card className="p-12 border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl text-center">
      <div className="space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto">
          <Wallet className="w-12 h-12 text-blue-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Connect Your Wallet</h2>
          <p className="text-slate-600 text-lg">Connect your Solana wallet to view your portfolio and start trading</p>
        </div>
        <div className="pt-4">
          <WalletConnectionButton />
        </div>
        <div className="text-sm text-slate-500 space-y-2">
          <p>Supported wallets: Phantom, Solflare, Backpack</p>
          <p>Or <button onClick={onShowWalletManagement} className="text-blue-600 hover:underline font-medium">create/import your own wallet</button></p>
        </div>
      </div>
    </Card>
  );
};

export default WalletConnectionPrompt;
