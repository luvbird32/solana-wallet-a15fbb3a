
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import ImportToken from './ImportToken';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  address?: string;
}

const TokenList = () => {
  const [showImport, setShowImport] = useState(false);
  const [importedTokens, setImportedTokens] = useState<any[]>([]);

  // Mock token data - in real app this would come from Solana token accounts
  const defaultTokens: Token[] = [
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

  useEffect(() => {
    loadImportedTokens();
  }, []);

  const loadImportedTokens = () => {
    const stored = JSON.parse(localStorage.getItem('imported_tokens') || '[]');
    setImportedTokens(stored);
  };

  const handleTokenImported = (token: any) => {
    loadImportedTokens();
    setShowImport(false);
  };

  const allTokens = [
    ...defaultTokens,
    ...importedTokens.map(token => ({
      symbol: token.symbol,
      name: token.name,
      balance: 0, // In real app, would fetch actual balance
      usdValue: 0,
      change24h: 0,
      icon: token.symbol.charAt(0),
      address: token.address
    }))
  ];

  if (showImport) {
    return (
      <ImportToken
        onBack={() => setShowImport(false)}
        onTokenImported={handleTokenImported}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Your Tokens</h3>
        <Button
          onClick={() => setShowImport(true)}
          variant="outline"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Import Token
        </Button>
      </div>
      
      {allTokens.map((token, index) => (
        <Card key={`${token.symbol}-${index}`} className="token-card group p-8 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                {token.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-2xl">{token.symbol}</h3>
                <p className="text-slate-500 text-base font-medium">{token.name}</p>
                {token.address && (
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {token.address.slice(0, 8)}...{token.address.slice(-8)}
                  </p>
                )}
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
