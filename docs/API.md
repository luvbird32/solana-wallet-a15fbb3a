
# API Reference

This document describes the APIs and interfaces used in the Solana Wallet application.

## 🌟 Overview

The application uses a modular API structure with clear separation between frontend clients and backend services.

## 🏗️ Architecture

```
Frontend (React) → API Clients → Backend Services → Blockchain/External APIs
```

### API Layers
- **Frontend Components** - User interface
- **API Clients** - Frontend-to-backend communication
- **Backend Services** - Business logic and data processing
- **External APIs** - Blockchain and third-party services

## 🔌 Frontend API Clients

### Token API Client (`src/api/tokenApi.ts`)

#### `searchTokenByAddress(address: string)`
Search for token information using its mint address.

**Parameters:**
- `address` (string) - The token's mint address

**Returns:**
- `Promise<TokenInfo | null>` - Token information or null if not found

**Example:**
```typescript
import { searchTokenByAddress } from '@/api/tokenApi';

const token = await searchTokenByAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
console.log(token); // USDC token info
```

#### `searchTokenByName(name: string)`
Search for token information using its name or symbol.

**Parameters:**
- `name` (string) - Token name or symbol (e.g., "USDC", "Raydium")

**Returns:**
- `Promise<TokenInfo | null>` - Token information or null if not found

**Example:**
```typescript
import { searchTokenByName } from '@/api/tokenApi';

const token = await searchTokenByName('USDC');
console.log(token); // USDC token info
```

#### `clearTokenCache()`
Clears the token information cache.

**Returns:**
- `Promise<void>`

### Wallet API Client (`src/api/walletApi.ts`)

#### `storeWallet(wallet: WalletAccount)`
Store wallet information.

**Parameters:**
- `wallet` (WalletAccount) - The wallet data to store

**Returns:**
- `Promise<{success: boolean; error?: string}>` - Operation result

#### `getWallet(walletId: string)`
Retrieve wallet information by ID.

**Parameters:**
- `walletId` (string) - The wallet identifier

**Returns:**
- `Promise<WalletAccount | null>` - Wallet data or null if not found

#### `getAllWallets()`
Retrieve all stored wallets.

**Returns:**
- `Promise<WalletAccount[]>` - Array of wallet accounts

#### `deleteWallet(walletId: string)`
Delete a wallet by ID.

**Parameters:**
- `walletId` (string) - The wallet identifier to delete

**Returns:**
- `Promise<{success: boolean; error?: string}>` - Operation result

## 🧩 React Hooks

### Token Hooks (`src/hooks/useTokenData.ts`)

#### `useTokenSearch(searchValue: string, searchType: 'address' | 'name')`
React Query hook for searching tokens with caching.

**Parameters:**
- `searchValue` (string) - The value to search for
- `searchType` ('address' | 'name') - Search method

**Returns:**
- React Query result object with token data

**Features:**
- Automatic caching (5 minutes fresh, 10 minutes cache)
- Retry logic (2 attempts)
- Only runs when searchValue is provided

**Example:**
```typescript
const { data: token, isLoading, error } = useTokenSearch(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'address'
);
```

#### `useTokenBalances()`
React Query hook for fetching token balances.

**Returns:**
- React Query result object with balance data

**Features:**
- Auto-refresh every minute
- Fresh data for 30 seconds
- Mock data (will connect to real APIs in future)

### Wallet Hooks (`src/hooks/useWallet.tsx`)

#### `useWallet()`
Main wallet connection hook.

**Returns:**
```typescript
{
  connected: boolean;           // Is wallet connected?
  publicKey: string | null;     // Wallet public key
  connecting: boolean;          // Is connection in progress?
  connect: () => Promise<void>; // Connect function
  disconnect: () => void;       // Disconnect function
  walletName: string | null;    // Connected wallet name
}
```

**Supported Wallets:**
- Phantom
- Solflare
- Backpack

### Utility Hooks

#### `useBalanceFormatting()` (`src/hooks/useBalanceFormatting.ts`)
Formatting utilities for balances and currencies.

**Returns:**
```typescript
{
  formatBalance: (balance: number, decimals?: number) => string;
  formatUSD: (amount: number) => string;
  formatPercentage: (percentage: number, showSign?: boolean) => string;
  formatTokenAmount: (amount: number, symbol: string, showSign?: boolean) => string;
}
```

#### `useAddressFormatting()` (`src/hooks/useAddressFormatting.ts`)
Address formatting and validation utilities.

**Returns:**
```typescript
{
  formatAddress: (address: string, startChars?: number, endChars?: number) => string;
  formatPublicKey: (publicKey: string) => string;
  isValidSolanaAddress: (address: string) => boolean;
  copyToClipboard: (text: string) => Promise<void>;
}
```

## 📊 Data Types

### TokenInfo (`src/types/token.ts`)
```typescript
interface TokenInfo {
  symbol: string;        // Token symbol (e.g., "USDC")
  name: string;          // Full token name
  address: string;       // Mint address
  decimals: number;      // Token decimal places
  logoURI?: string;      // Token logo URL
  verified?: boolean;    // Is token verified?
}
```

### WalletAccount (`src/types/wallet.ts`)
```typescript
interface WalletAccount {
  id: string;            // Unique identifier
  name: string;          // User-defined name
  publicKey: string;     // Wallet public key
  walletType: string;    // Wallet provider type
  createdAt: Date;       // Creation timestamp
  lastUsed: Date;        // Last access time
}
```

## 🔐 Backend Services

### Token Service (`backend/services/tokenService.ts`)

#### Core Functions
- `searchTokenByAddress(address: string)` - Find token by mint address
- `searchTokenByName(name: string)` - Find token by name/symbol
- `validateTokenAddress(address: string)` - Validate token address format
- `clearTokenCache()` - Clear cached token data

### Security Service (`backend/services/securityService.ts`)

#### Rate Limiting
- `checkRateLimit(operation: string, clientId: string)` - Check if operation is allowed
- Operations: 'WALLET_CREATION', 'TOKEN_SEARCH', 'BALANCE_CHECK'

#### Security Features
- Request rate limiting
- Input validation
- Error sanitization

## ⚙️ Configuration

### Network Configuration (`backend/config/constants.ts`)

```typescript
// Solana networks
SOLANA_NETWORKS: {
  MAINNET: { name, rpcUrl, explorerUrl },
  TESTNET: { name, rpcUrl, explorerUrl },
  DEVNET: { name, rpcUrl, explorerUrl }
}

// Security settings
SECURITY_CONFIG: {
  ENCRYPTION: { /* encryption parameters */ },
  PASSWORD: { /* password requirements */ },
  SESSION: { /* session management */ },
  RATE_LIMITS: { /* rate limiting rules */ }
}
```

### Rate Limits
- **Wallet Creation**: 5 requests per minute
- **Token Search**: 100 requests per minute
- **Balance Check**: 200 requests per minute

## 🧪 Testing APIs

### Mock Data
Currently, the application uses mock data for development:
- Token searches return predefined tokens
- Balance queries return sample balances
- Real blockchain integration planned for future releases

### Testing Utilities
```typescript
// Test API calls
import { searchTokenByAddress } from '@/api/tokenApi';

// This will return mock data in development
const usdcToken = await searchTokenByAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
```

## 🚀 Future Enhancements

### Planned API Features
- Real Solana blockchain integration
- Live token price feeds
- Transaction history API
- NFT metadata fetching
- Cross-chain token support

### Performance Improvements
- Advanced caching strategies
- Request deduplication
- Optimistic updates
- Background sync

## 🔧 Error Handling

### Error Types
```typescript
// API errors are structured consistently
interface APIError {
  code: string;          // Error code
  message: string;       // Human-readable message
  details?: any;         // Additional error details
}
```

### Common Error Codes
- `WALLET_NOT_FOUND` - Wallet doesn't exist
- `INVALID_ADDRESS` - Invalid token/wallet address
- `NETWORK_ERROR` - Blockchain connection issue
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `TOKEN_NOT_FOUND` - Token doesn't exist

### Error Handling Example
```typescript
try {
  const token = await searchTokenByAddress(address);
} catch (error) {
  if (error.code === 'INVALID_ADDRESS') {
    // Handle invalid address
  } else if (error.code === 'NETWORK_ERROR') {
    // Handle network issues
  }
}
```

## 📞 Support

### API Support
- Check the [Development Guide](DEVELOPMENT.md) for setup help
- Review error codes and handling patterns
- Open issues for API bugs or enhancement requests
- Join community discussions for API questions

---

**This API reference is updated regularly. Check back for the latest information.**
