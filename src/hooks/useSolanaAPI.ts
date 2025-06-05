
import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@/hooks/useWallet';

interface SolanaBalance {
  sol: number;
  usdValue: number;
  change24h: number;
}

interface TokenBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  mintAddress?: string;
}

export const useSolanaAPI = () => {
  const { publicKey, connected } = useWallet();
  const [connection] = useState(() => new Connection('https://api.devnet.solana.com', 'confirmed'));
  const [balance, setBalance] = useState<SolanaBalance | null>(null);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    if (!publicKey || !connected) return;

    setLoading(true);
    setError(null);

    try {
      const pubKey = new PublicKey(publicKey);
      const lamports = await connection.getBalance(pubKey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      
      // Mock USD value calculation - in production, fetch from price API
      const mockUsdPrice = 62.15;
      const usdValue = solBalance * mockUsdPrice;
      
      setBalance({
        sol: solBalance,
        usdValue,
        change24h: 5.23, // Mock 24h change
      });

      // Fetch token accounts (simplified for demo)
      await fetchTokenBalances(pubKey);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
      setError('Failed to fetch wallet balance');
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenBalances = async (pubKey: PublicKey) => {
    try {
      // In production, this would use getTokenAccountsByOwner
      // For now, using mock data with actual structure
      const mockTokens: TokenBalance[] = [
        {
          symbol: 'SOL',
          name: 'Solana',
          balance: balance?.sol || 0,
          usdValue: balance?.usdValue || 0,
          change24h: 5.23,
          icon: '◎'
        },
        {
          symbol: 'USDC',
          name: 'USD Coin',
          balance: 1250.00,
          usdValue: 1250.00,
          change24h: 0.01,
          icon: '$',
          mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        }
      ];

      setTokens(mockTokens);
    } catch (err) {
      console.error('Failed to fetch token balances:', err);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
      setTokens([]);
    }
  }, [connected, publicKey]);

  return {
    balance,
    tokens,
    loading,
    error,
    refetch: fetchBalance,
    connection,
  };
};
