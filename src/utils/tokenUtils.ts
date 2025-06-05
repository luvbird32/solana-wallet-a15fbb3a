
interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export const saveTokenToStorage = (token: TokenInfo): boolean => {
  const existingTokens = getImportedTokens();
  const tokenExists = existingTokens.some((t: TokenInfo) => t.address === token.address);
  
  if (tokenExists) {
    return false;
  }

  existingTokens.push(token);
  localStorage.setItem('imported_tokens', JSON.stringify(existingTokens));
  return true;
};

export const getImportedTokens = (): TokenInfo[] => {
  return JSON.parse(localStorage.getItem('imported_tokens') || '[]');
};
