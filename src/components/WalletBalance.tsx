
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Repeat, TrendingUp } from 'lucide-react';

interface WalletBalanceProps {
  walletBalance: number;
  usdValue: number;
  change24h: number;
  onSendClick: () => void;
  onReceiveClick: () => void;
  onSwapClick: () => void;
}

const WalletBalance = ({ 
  walletBalance, 
  usdValue, 
  change24h, 
  onSendClick, 
  onReceiveClick, 
  onSwapClick 
}: WalletBalanceProps) => {
  return (
    <Card className="p-10 border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Total Portfolio Value</p>
          <div className="balance-text">{walletBalance.toFixed(2)} SOL</div>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-3xl text-slate-600 font-bold">${usdValue.toFixed(2)}</p>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
              change24h >= 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className={`w-4 h-4 ${change24h < 0 ? 'rotate-180' : ''}`} />
              <span>{change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <Button
          onClick={onSendClick}
          className="wallet-button py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg"
        >
          <ArrowUp className="w-6 h-6" />
          <span>Send</span>
        </Button>
        <Button
          onClick={onReceiveClick}
          className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg"
        >
          <ArrowDown className="w-6 h-6" />
          <span>Receive</span>
        </Button>
        <Button
          onClick={onSwapClick}
          className="secondary-button py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg"
        >
          <Repeat className="w-6 h-6" />
          <span>Swap</span>
        </Button>
      </div>
    </Card>
  );
};

export default WalletBalance;
