
import { useMemo } from 'react';

export const useAddressFormatting = () => {
  const formatAddress = useMemo(() => (address: string, startChars: number = 4, endChars: number = 4) => {
    if (!address || address.length <= startChars + endChars) {
      return address;
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }, []);

  const formatPublicKey = useMemo(() => (publicKey: string) => {
    return formatAddress(publicKey, 4, 4);
  }, [formatAddress]);

  const isValidSolanaAddress = useMemo(() => (address: string) => {
    // Basic Solana address validation (base58, 32-44 characters)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(address);
  }, []);

  return {
    formatAddress,
    formatPublicKey,
    isValidSolanaAddress,
  };
};
