
import { TokenInfo } from '@/types/token';

// In-memory cache for imported tokens
let importedTokensCache: TokenInfo[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

const isValidCache = (): boolean => {
  return importedTokensCache !== null && Date.now() - cacheTimestamp < CACHE_DURATION;
};

export const saveTokenToStorage = (token: TokenInfo): boolean => {
  const existingTokens = getImportedTokens();
  const tokenExists = existingTokens.some((t: TokenInfo) => t.address === token.address);
  
  if (tokenExists) {
    return false;
  }

  existingTokens.push(token);
  localStorage.setItem('imported_tokens', JSON.stringify(existingTokens));
  
  // Update cache
  importedTokensCache = existingTokens;
  cacheTimestamp = Date.now();
  
  console.log('Token saved and cached:', token.symbol);
  return true;
};

export const getImportedTokens = (): TokenInfo[] => {
  // Return cached data if valid
  if (isValidCache()) {
    console.log('Returning cached imported tokens');
    return importedTokensCache!;
  }

  // Load from localStorage and update cache
  const tokens = JSON.parse(localStorage.getItem('imported_tokens') || '[]');
  importedTokensCache = tokens;
  cacheTimestamp = Date.now();
  
  console.log('Loaded imported tokens from storage and cached');
  return tokens;
};

// Clear cache function for manual cache invalidation
export const clearImportedTokensCache = (): void => {
  importedTokensCache = null;
  cacheTimestamp = 0;
  console.log('Imported tokens cache cleared');
};
