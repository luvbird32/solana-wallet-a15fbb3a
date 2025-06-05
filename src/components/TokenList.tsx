
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
        <Card key={token.symbol} className="token-card group p-8 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                {token.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-2xl">{token.symbol}</h3>
                <p className="text-slate-500 text-base font-medium">{token.name}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-slate-900 text-2xl">{token.balance.toFixed(2)}</p>
              <p className="text-slate-500 text-base font-medium">${token.usdValue.toFixed(2)}</p>
              <div className={`flex items-center justify-end space-x-1 mt-2 ${
                token.change24h >= 0 ? 'text-green-600' : 'text-red-500'
              }`}>
                {token.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-base font-bold">
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TokenList;
