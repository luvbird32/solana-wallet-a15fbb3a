
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface TokenSearchFormProps {
  onTokenFound: (token: TokenInfo | null) => void;
  loading: boolean;
  error: string;
}

const TokenSearchForm = ({ onTokenFound, loading, error }: TokenSearchFormProps) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [searchType, setSearchType] = useState<'address' | 'name'>('address');

  const searchTokenByAddress = async (address: string) => {
    const mockTokens: { [key: string]: TokenInfo } = {
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6
      },
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R': {
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        symbol: 'RAY',
        name: 'Raydium',
        decimals: 6
      },
      'So11111111111111111111111111111111111111112': {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Wrapped SOL',
        decimals: 9
      }
    };

    const token = mockTokens[address];
    if (token) {
      return token;
    } else {
      return {
        address: address,
        symbol: 'UNKNOWN',
        name: 'Unknown Token',
        decimals: 9
      };
    }
  };

  const searchTokenByName = async (name: string) => {
    const tokensByName: { [key: string]: TokenInfo } = {
      'usd coin': {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6
      },
      'usdc': {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6
      },
      'raydium': {
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        symbol: 'RAY',
        name: 'Raydium',
        decimals: 6
      },
      'ray': {
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        symbol: 'RAY',
        name: 'Raydium',
        decimals: 6
      },
      'wrapped sol': {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Wrapped SOL',
        decimals: 9
      },
      'wsol': {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Wrapped SOL',
        decimals: 9
      }
    };

    return tokensByName[name.toLowerCase()];
  };

  const handleSearch = async () => {
    const searchValue = searchType === 'address' ? tokenAddress : tokenName;
    
    if (!searchValue.trim()) {
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      let token;
      if (searchType === 'address') {
        token = await searchTokenByAddress(searchValue);
      } else {
        token = await searchTokenByName(searchValue);
      }

      onTokenFound(token || null);
    } catch (err) {
      console.error('Token search error:', err);
      onTokenFound(null);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900">Add Custom Token</CardTitle>
        <p className="text-slate-600">Search by token name or enter the token's mint address</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
          <Button
            variant={searchType === 'name' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSearchType('name')}
            className="flex-1"
          >
            Search by Name
          </Button>
          <Button
            variant={searchType === 'address' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSearchType('address')}
            className="flex-1"
          >
            Search by Address
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tokenSearch" className="text-slate-700 font-medium">
            {searchType === 'address' ? 'Token Mint Address' : 'Token Name'}
          </Label>
          <div className="flex space-x-2">
            <Input
              id="tokenSearch"
              value={searchType === 'address' ? tokenAddress : tokenName}
              onChange={(e) => {
                if (searchType === 'address') {
                  setTokenAddress(e.target.value);
                } else {
                  setTokenName(e.target.value);
                }
              }}
              placeholder={searchType === 'address' 
                ? 'Enter token mint address...' 
                : 'Enter token name (e.g., USDC, Raydium)...'
              }
              className="flex-1 border-slate-200 focus:border-blue-400 text-slate-900"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="wallet-button px-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSearchForm;
