import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { TokenInfo } from '@/types/token';
import { searchTokenByAddress, searchTokenByName } from '@/api/tokenApi';

interface TokenSearchFormProps {
  onTokenFound: (token: TokenInfo | null) => void;
  loading: boolean;
  error: string;
}

const TokenSearchForm = ({ onTokenFound, loading, error }: TokenSearchFormProps) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [searchType, setSearchType] = useState<'address' | 'name'>('address');

  const handleSearch = async () => {
    const searchValue = searchType === 'address' ? tokenAddress : tokenName;
    
    if (!searchValue.trim()) {
      return;
    }
    
    try {
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
