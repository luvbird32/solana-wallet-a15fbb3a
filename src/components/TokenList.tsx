
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
    <div className="space-y-4">
      {tokens.map((token, index) => (
        <Card key={token.symbol} className="token-card group p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {token.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">{token.symbol}</h3>
                <p className="text-gray-300 text-sm font-medium">{token.name}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-white text-xl">{token.balance.toFixed(2)}</p>
              <p className="text-gray-300 text-sm font-medium">${token.usdValue.toFixed(2)}</p>
              <p className={`text-sm font-bold mt-1 ${
                token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
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
