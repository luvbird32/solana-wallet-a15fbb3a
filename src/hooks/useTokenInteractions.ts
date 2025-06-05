
/**
 * @fileoverview Custom hook for handling token interactions and modal state
 */

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Token interface for token interaction components
 */
interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  address?: string;
}

/**
 * Custom hook for managing token interactions like send, receive, swap
 * @returns {Object} Object containing token interaction state and handlers
 */
export const useTokenInteractions = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const { toast } = useToast();

  /**
   * Handles clicking on a token to show its details
   * @param {Token} token - The token that was clicked
   * @returns {void}
   */
  const handleTokenClick = (token: Token) => {
    console.log('Token clicked:', token);
    setSelectedToken(token);
    setShowTokenDetails(true);
  };

  /**
   * Handles token actions like send, receive, or swap
   * @param {'send' | 'receive' | 'swap'} action - The action to perform
   * @param {Token} token - The token to perform the action on
   * @returns {void}
   */
  const handleTokenAction = (action: 'send' | 'receive' | 'swap', token: Token) => {
    console.log(`${action} action triggered for:`, token);
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${token.symbol}`,
      description: `${action} functionality will be implemented here`,
    });
    
    // Close the modal after action
    setShowTokenDetails(false);
  };

  /**
   * Closes the token details modal and clears selected token
   * @returns {void}
   */
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
