
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  address?: string;
}

export const useTokenInteractions = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const { toast } = useToast();

  const handleTokenClick = (token: Token) => {
    console.log('Token clicked:', token);
    setSelectedToken(token);
    
    // Show token details in a toast for now
    toast({
      title: `${token.symbol} Selected`,
      description: `Balance: ${token.balance.toFixed(2)} | Value: $${token.usdValue.toFixed(2)}`,
    });
    
    // Future: navigate to token details, show token actions modal, etc.
  };

  const handleTokenAction = (action: 'send' | 'receive' | 'swap', token: Token) => {
    console.log(`${action} action triggered for:`, token);
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${token.symbol}`,
      description: `${action} functionality will be implemented here`,
    });
  };

  const clearSelectedToken = () => {
    setSelectedToken(null);
  };

  return {
    selectedToken,
    handleTokenClick,
    handleTokenAction,
    clearSelectedToken
  };
};
