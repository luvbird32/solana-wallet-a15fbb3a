
import React from 'react';
import { Card } from '@/components/ui/card';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
}

const TokenList = () => {
  // Mock token data - in real app this would come from Solana token accounts
  const tokens: Token[] = [
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 45.67,
      usdValue: 2834.21,
      change24h: 5.23,
      icon: '◎'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 1250.00,
      usdValue: 1250.00,
      change24h: 0.01,
      icon: '$'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      balance: 156.78,
      usdValue: 234.56,
      change24h: -2.14,
      icon: '⚡'
    }
  ];

  return (
    <div className="space-y-3">
      {tokens.map((token, index) => (
        <Card key={token.symbol} className="glass-card p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-crypto-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
                {token.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">{token.symbol}</h3>
                <p className="text-gray-400 text-sm">{token.name}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-white text-lg">{token.balance.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">${token.usdValue.toFixed(2)}</p>
              <p className={`text-sm font-medium ${
                token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TokenList;
