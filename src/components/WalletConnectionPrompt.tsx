
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletConnectionPromptProps {
  onShowWalletManagement: () => void;
}

const WalletConnectionPrompt = ({ onShowWalletManagement }: WalletConnectionPromptProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-16 glass border border-white/30 shadow-2xl rounded-3xl text-center max-w-2xl transform hover:scale-[1.02] transition-all duration-500">
        <div className="space-y-8">
          <div className="w-32 h-32 glass border border-white/40 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-float">
            <Wallet className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Connect Your Wallet</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Connect your Solana wallet to view your portfolio and start trading with the most secure and user-friendly experience
            </p>
          </div>
          <div className="pt-6">
            <WalletConnectionButton />
          </div>
          <div className="text-base text-muted-foreground space-y-3 pt-4">
            <p className="font-medium">✨ Supported wallets: Phantom, Solflare, Backpack</p>
            <p>
              Or{' '}
              <button 
                onClick={onShowWalletManagement} 
                className="text-primary hover:text-primary-hover font-semibold underline underline-offset-4 hover:underline-offset-8 transition-all duration-300"
              >
                create/import your own wallet
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletConnectionPrompt;
