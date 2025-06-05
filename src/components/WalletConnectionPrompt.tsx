
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet, Shield, Zap, Star } from 'lucide-react';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletConnectionPromptProps {
  onShowWalletManagement: () => void;
}

const WalletConnectionPrompt = ({ onShowWalletManagement }: WalletConnectionPromptProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-20 bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl text-center max-w-3xl transform hover:scale-[1.02] transition-all duration-500">
        <div className="space-y-10">
          <div className="relative mx-auto w-fit">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-float">
              <Wallet className="w-20 h-20 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect Your Wallet
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
              Connect your Solana wallet to view your portfolio and start trading with the most secure and user-friendly experience on the blockchain
            </p>
          </div>
          <div className="pt-8">
            <WalletConnectionButton />
          </div>
          <div className="text-lg text-slate-600 space-y-6 pt-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-slate-700">Phantom</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-slate-700">Solflare</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-slate-700">Backpack</span>
              </div>
            </div>
            <p className="text-base">
              Or{' '}
              <button 
                onClick={onShowWalletManagement} 
                className="text-blue-600 hover:text-purple-600 font-bold underline underline-offset-4 hover:underline-offset-8 transition-all duration-300"
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
