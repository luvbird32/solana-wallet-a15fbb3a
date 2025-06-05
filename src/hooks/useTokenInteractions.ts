
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
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const { toast } = useToast();

  const handleTokenClick = (token: Token) => {
    console.log('Token clicked:', token);
    setSelectedToken(token);
    setShowTokenDetails(true);
  };

  const handleTokenAction = (action: 'send' | 'receive' | 'swap', token: Token) => {
    console.log(`${action} action triggered for:`, token);
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${token.symbol}`,
      description: `${action} functionality will be implemented here`,
    });
    
    // Close the modal after action
    setShowTokenDetails(false);
  };

  const closeTokenDetails = () => {
    setShowTokenDetails(false);
    setSelectedToken(null);
  };

  return {
    selectedToken,
    showTokenDetails,
    handleTokenClick,
    handleTokenAction,
    closeTokenDetails
  };
};
