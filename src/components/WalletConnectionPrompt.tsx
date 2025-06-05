
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet, Shield, Zap, Star } from 'lucide-react';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletConnectionPromptProps {
  onShowWalletManagement: () => void;
}

const WalletConnectionPrompt: React.FC<WalletConnectionPromptProps> = ({ onShowWalletManagement }) => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="main" aria-labelledby="wallet-connection-title">
      <Card className="p-20 bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl text-center max-w-3xl transform hover:scale-[1.02] transition-all duration-500">
        <div className="space-y-10">
          <div className="relative mx-auto w-fit" role="img" aria-label="Wallet connection illustration">
            <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-float">
              <Wallet className="w-20 h-20 text-white" aria-hidden="true" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-xl">
              <Star className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl">
              <Shield className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 id="wallet-connection-title" className="text-5xl font-black text-slate-800">
              Connect Your Wallet
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
              Connect your Solana wallet to view your portfolio and start trading with the most secure and user-friendly experience on the blockchain
            </p>
          </div>
          <div className="pt-8" role="group" aria-label="Wallet connection options">
            <WalletConnectionButton />
          </div>
          <div className="text-lg text-slate-600 space-y-6 pt-6">
            <div className="grid grid-cols-3 gap-6" role="group" aria-label="Supported wallet providers">
              <div 
                className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200 hover:border-blue-300 focus-within:border-blue-300 transition-colors"
                tabIndex={0}
                role="button"
                aria-label="Phantom wallet - secure and trusted"
                onKeyDown={(e) => handleKeyDown(e, () => {})}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-slate-700">Phantom</span>
              </div>
              <div 
                className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200 hover:border-emerald-300 focus-within:border-emerald-300 transition-colors"
                tabIndex={0}
                role="button"
                aria-label="Solflare wallet - fast and reliable"
                onKeyDown={(e) => handleKeyDown(e, () => {})}
              >
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-slate-700">Solflare</span>
              </div>
              <div 
                className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200 hover:border-red-300 focus-within:border-red-300 transition-colors"
                tabIndex={0}
                role="button"
                aria-label="Backpack wallet - feature-rich experience"
                onKeyDown={(e) => handleKeyDown(e, () => {})}
              >
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-slate-700">Backpack</span>
              </div>
            </div>
            <p className="text-base">
              Or{' '}
              <button 
                onClick={onShowWalletManagement}
                onKeyDown={(e) => handleKeyDown(e, onShowWalletManagement)}
                className="text-blue-600 hover:text-blue-800 focus:text-blue-800 font-bold underline underline-offset-4 hover:underline-offset-8 focus:underline-offset-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                aria-label="Create or import your own wallet - opens wallet management"
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

WalletConnectionPrompt.displayName = 'WalletConnectionPrompt';

export default WalletConnectionPrompt;
