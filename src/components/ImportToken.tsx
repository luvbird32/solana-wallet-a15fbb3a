
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImportTokenProps {
  onBack: () => void;
  onTokenImported: (token: any) => void;
}

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

const ImportToken = ({ onBack, onTokenImported }: ImportTokenProps) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const searchToken = async () => {
    if (!tokenAddress.trim()) {
      setError('Please enter a token address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would fetch from Solana token registry or on-chain data
      // For demo purposes, we'll simulate some common tokens
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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const token = mockTokens[tokenAddress];
      if (token) {
        setTokenInfo(token);
      } else {
        // For unknown tokens, create a generic entry
        setTokenInfo({
          address: tokenAddress,
          symbol: 'UNKNOWN',
          name: 'Unknown Token',
          decimals: 9
        });
      }
    } catch (err) {
      setError('Failed to fetch token information');
      console.error('Token search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const importToken = () => {
    if (!tokenInfo) return;

    // Save token to localStorage (in real app, this would be stored properly)
    const existingTokens = JSON.parse(localStorage.getItem('imported_tokens') || '[]');
    const tokenExists = existingTokens.some((t: TokenInfo) => t.address === tokenInfo.address);
    
    if (tokenExists) {
      toast({
        title: "Token Already Added",
        description: "This token is already in your wallet",
        variant: "destructive",
      });
      return;
    }

    existingTokens.push(tokenInfo);
    localStorage.setItem('imported_tokens', JSON.stringify(existingTokens));

    toast({
      title: "Token Imported",
      description: `${tokenInfo.symbol} has been added to your wallet`,
    });

    onTokenImported(tokenInfo);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Import Token</h2>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">Add Custom Token</CardTitle>
          <p className="text-slate-600">Enter the token's mint address to add it to your wallet</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tokenAddress" className="text-slate-700 font-medium">
              Token Mint Address
            </Label>
            <div className="flex space-x-2">
              <Input
                id="tokenAddress"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Enter token mint address..."
                className="flex-1 border-slate-200 focus:border-blue-400 text-slate-900"
              />
              <Button
                onClick={searchToken}
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

          {tokenInfo && (
            <Card className="border border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Token Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Symbol</p>
                      <p className="font-medium text-slate-900">{tokenInfo.symbol}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Name</p>
                      <p className="font-medium text-slate-900">{tokenInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Decimals</p>
                      <p className="font-medium text-slate-900">{tokenInfo.decimals}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Address</p>
                      <p className="font-mono text-xs text-slate-900 break-all">
                        {tokenInfo.address.slice(0, 8)}...{tokenInfo.address.slice(-8)}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={importToken}
                    className="w-full wallet-button mt-4"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Import Token
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="border border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900">Important Notes</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Only import tokens from trusted sources</li>
              <li>• Verify the token address before importing</li>
              <li>• Scam tokens may have similar names to legitimate tokens</li>
              <li>• Always double-check the official token address</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportToken;
