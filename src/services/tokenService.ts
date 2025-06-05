
import { TokenInfo } from '@/types/token';

const MOCK_TOKENS: { [key: string]: TokenInfo } = {
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

const TOKENS_BY_NAME: { [key: string]: TokenInfo } = {
  'usd coin': MOCK_TOKENS['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
  'usdc': MOCK_TOKENS['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
  'raydium': MOCK_TOKENS['4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'],
  'ray': MOCK_TOKENS['4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'],
  'wrapped sol': MOCK_TOKENS['So11111111111111111111111111111111111111112'],
  'wsol': MOCK_TOKENS['So11111111111111111111111111111111111111112']
};

export const searchTokenByAddress = async (address: string): Promise<TokenInfo | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const token = MOCK_TOKENS[address];
  if (token) {
    return token;
  }
  
  // Return unknown token structure for unrecognized addresses
  return {
    address: address,
    symbol: 'UNKNOWN',
    name: 'Unknown Token',
    decimals: 9
  };
};

export const searchTokenByName = async (name: string): Promise<TokenInfo | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return TOKENS_BY_NAME[name.toLowerCase()] || null;
};
