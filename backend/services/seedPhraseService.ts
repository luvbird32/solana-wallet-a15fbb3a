
export interface SeedPhraseValidation {
  isValid: boolean;
  wordCount: number;
  invalidWords: string[];
  suggestions: string[];
}

// Seed phrase generation business logic
export const generateSecureSeedPhrase = (): string => {
  // TODO: Replace with actual BIP39 generation when backend is implemented
  const mockWords = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid'
  ];
  
  const seedPhrase = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * mockWords.length);
    seedPhrase.push(mockWords[randomIndex]);
  }
  
  return seedPhrase.join(' ');
};

// Advanced seed phrase validation business logic
export const validateSeedPhraseFormat = (seedPhrase: string): SeedPhraseValidation => {
  const words = seedPhrase.trim().toLowerCase().split(/\s+/);
  const wordCount = words.length;
  
  // TODO: Replace with actual BIP39 word list validation when backend is implemented
  const validWordList = new Set([
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid'
    // ... would contain full BIP39 word list
  ]);

  const invalidWords = words.filter(word => !validWordList.has(word));
  const suggestions: string[] = [];

  // Generate suggestions for invalid words
  invalidWords.forEach(word => {
    // TODO: Implement fuzzy matching for suggestions when backend is implemented
    suggestions.push(`Did you mean "ability" instead of "${word}"?`);
  });

  return {
    isValid: wordCount === 12 && invalidWords.length === 0,
    wordCount,
    invalidWords,
    suggestions
  };
};

// Seed phrase security analysis
export const analyzeSeedPhraseSecurity = (seedPhrase: string): {
  securityLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  recommendations: string[];
} => {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Check for common patterns
  const words = seedPhrase.trim().toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  
  if (uniqueWords.size < words.length) {
    warnings.push('Seed phrase contains duplicate words');
  }
  
  // TODO: Add more sophisticated security analysis when backend is implemented
  // - Check against common/weak seed phrases
  // - Analyze entropy
  // - Check for sequential patterns
  
  recommendations.push('Store your seed phrase in a secure offline location');
  recommendations.push('Never share your seed phrase with anyone');
  
  const securityLevel = warnings.length === 0 ? 'high' : warnings.length === 1 ? 'medium' : 'low';
  
  return {
    securityLevel,
    warnings,
    recommendations
  };
};
