
// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Transition timings using design tokens
export const TRANSITIONS = {
  BUTTON_HOVER: 'transition-all duration-300',
  CARD_HOVER: 'transition-all duration-200',
  FADE_IN: 'animate-fade-in',
  SCALE_HOVER: 'transform hover:scale-105',
} as const;

// Semantic color classes using design tokens
export const STATUS_COLORS = {
  SUCCESS: 'text-success',
  WARNING: 'text-warning',
  ERROR: 'text-error',
  INFO: 'text-info',
  NEUTRAL: 'text-neutral-500',
} as const;

// Background color classes using design tokens
export const BACKGROUND_COLORS = {
  SUCCESS: 'bg-success-light',
  WARNING: 'bg-warning-light',
  ERROR: 'bg-error-light',
  INFO: 'bg-info-light',
  PRIMARY: 'bg-primary',
  SURFACE: 'bg-surface',
  CARD: 'bg-card',
} as const;

// Border color classes using design tokens
export const BORDER_COLORS = {
  DEFAULT: 'border-border',
  SUCCESS: 'border-success/30',
  WARNING: 'border-warning/30',
  ERROR: 'border-error/30',
  INFO: 'border-info/30',
  HOVER: 'border-border-hover',
} as const;

// Wallet provider names
export const WALLET_PROVIDERS = {
  PHANTOM: 'Phantom',
  SOLFLARE: 'Solflare', 
  BACKPACK: 'Backpack',
} as const;

// Transaction status mappings using semantic colors
export const TRANSACTION_STATUS_COLORS = {
  confirmed: STATUS_COLORS.SUCCESS,
  pending: STATUS_COLORS.WARNING,
  failed: STATUS_COLORS.ERROR,
} as const;

// Common spacing and sizing using design tokens
export const SIZES = {
  ICON_SM: 'w-4 h-4',
  ICON_MD: 'w-6 h-6',
  ICON_LG: 'w-8 h-8',
  BUTTON_PADDING: 'px-4 py-2',
  CARD_PADDING: 'p-6',
  BORDER_RADIUS: 'rounded-xl',
  BORDER_RADIUS_LG: 'rounded-2xl',
} as const;

// Glass morphism and enhanced effects using design tokens
export const EFFECTS = {
  GLASS: 'backdrop-blur-md bg-white/10 border border-white/20 shadow-xl',
  ENHANCED_CARD: 'backdrop-blur-md bg-white/10 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl',
  WALLET_GRADIENT: 'bg-gradient-to-r from-primary to-primary-hover',
  FLOAT_ANIMATION: 'animate-float',
} as const;

// Network configuration
export const SOLANA_NETWORKS = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
  TESTNET: 'https://api.testnet.solana.com',
} as const;
