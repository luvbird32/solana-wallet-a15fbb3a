
// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Transition timings
export const TRANSITIONS = {
  BUTTON_HOVER: 'transition-all duration-300',
  CARD_HOVER: 'transition-all duration-200',
  FADE_IN: 'animate-fade-in',
  SCALE_HOVER: 'transform hover:scale-105',
} as const;

// Color classes for status indicators
export const STATUS_COLORS = {
  SUCCESS: 'text-green-600',
  WARNING: 'text-yellow-600',
  ERROR: 'text-red-600',
  INFO: 'text-blue-600',
  NEUTRAL: 'text-slate-500',
} as const;

// Wallet provider names
export const WALLET_PROVIDERS = {
  PHANTOM: 'Phantom',
  SOLFLARE: 'Solflare', 
  BACKPACK: 'Backpack',
} as const;

// Transaction status mappings
export const TRANSACTION_STATUS_COLORS = {
  confirmed: STATUS_COLORS.SUCCESS,
  pending: STATUS_COLORS.WARNING,
  failed: STATUS_COLORS.ERROR,
} as const;

// Common spacing and sizing
export const SIZES = {
  ICON_SM: 'w-4 h-4',
  ICON_MD: 'w-6 h-6',
  ICON_LG: 'w-8 h-8',
  BUTTON_PADDING: 'px-4 py-2',
  CARD_PADDING: 'p-6',
} as const;
