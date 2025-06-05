
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDown } from 'lucide-react';

interface SwapInterfaceProps {
  onClose: () => void;
}

const SwapInterface = ({ onClose }: SwapInterfaceProps) => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');

  const tokens = [
    { symbol: 'SOL', name: 'Solana', price: 62.15 },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00 },
    { symbol: 'RAY', name: 'Raydium', price: 1.45 }
  ];

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    // In real app, this would use Jupiter aggregator for best rates
    console.log('Swapping:', { fromAmount, fromToken, toAmount, toToken });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="glass-card p-6 w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">From</label>
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="bg-transparent border-none text-2xl font-bold text-white placeholder-gray-400 p-0"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-crypto-gradient rounded-lg px-3 py-2 text-white font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Balance: 45.67 {fromToken}</span>
                <span>${tokens.find(t => t.symbol === fromToken)?.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSwapTokens}
              variant="ghost"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">To</label>
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="bg-transparent border-none text-2xl font-bold text-white placeholder-gray-400 p-0"
                />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-crypto-gradient rounded-lg px-3 py-2 text-white font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Balance: 1250.00 {toToken}</span>
                <span>${tokens.find(t => t.symbol === toToken)?.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-white/5 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Rate</span>
              <span>1 {fromToken} = {(tokens.find(t => t.symbol === fromToken)?.price! / tokens.find(t => t.symbol === toToken)?.price!).toFixed(4)} {toToken}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Fee</span>
              <span>0.25%</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Route</span>
              <span>Jupiter Aggregator</span>
            </div>
          </div>

          <Button
            onClick={handleSwap}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            disabled={!fromAmount || !toAmount}
          >
            Swap Tokens
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
