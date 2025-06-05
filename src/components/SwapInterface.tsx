
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
      <Card className="bg-white p-8 w-full max-w-md animate-fade-in shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Swap Tokens</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          {/* From Token */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">From</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="bg-transparent border-none text-2xl font-bold text-slate-900 placeholder-slate-400 p-0 shadow-none"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl px-4 py-2 font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol} className="bg-blue-600">
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
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
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">To</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="bg-transparent border-none text-2xl font-bold text-slate-900 placeholder-slate-400 p-0 shadow-none"
                />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl px-4 py-2 font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol} className="bg-blue-600">
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Balance: 1250.00 {toToken}</span>
                <span>${tokens.find(t => t.symbol === toToken)?.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Rate</span>
              <span>1 {fromToken} = {(tokens.find(t => t.symbol === fromToken)?.price! / tokens.find(t => t.symbol === toToken)?.price!).toFixed(4)} {toToken}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fee</span>
              <span>0.25%</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Route</span>
              <span>Jupiter Aggregator</span>
            </div>
          </div>

          <Button
            onClick={handleSwap}
            className="w-full wallet-button py-4 text-lg rounded-xl"
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
