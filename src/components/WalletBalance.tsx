
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
    <Card className="p-10 glass border border-white/30 shadow-xl rounded-3xl">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Total Portfolio Value</p>
          <div className="balance-text">{walletBalance.toFixed(2)} SOL</div>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-3xl text-foreground font-bold">${usdValue.toFixed(2)}</p>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold glass border ${
              change24h >= 0 
                ? 'border-success/30 text-success' 
                : 'border-error/30 text-error'
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
          className="glass border border-white/40 hover:border-white/60 bg-primary/90 hover:bg-primary text-primary-foreground py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg backdrop-blur-md"
        >
          <ArrowUp className="w-6 h-6" />
          <span>Send</span>
        </Button>
        <Button
          onClick={onReceiveClick}
          className="glass border border-white/40 hover:border-white/60 text-foreground hover:bg-white/20 font-semibold py-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg backdrop-blur-md"
        >
          <ArrowDown className="w-6 h-6" />
          <span>Receive</span>
        </Button>
        <Button
          onClick={onSwapClick}
          className="glass border border-white/40 hover:border-white/60 text-foreground hover:bg-white/20 py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg backdrop-blur-md"
        >
          <Repeat className="w-6 h-6" />
          <span>Swap</span>
        </Button>
      </div>
    </Card>
  );
};

export default WalletBalance;
