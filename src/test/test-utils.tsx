
/**
 * @fileoverview Testing utilities and custom render functions
 * @description Provides custom render function with all necessary providers
 * and utility functions for testing React components with proper context
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { WalletStateProvider } from '@/contexts/WalletStateContext';
import { vi } from 'vitest';

// Import screen separately to ensure it's available
import * as RTL from '@testing-library/react';

/**
 * Custom render options extending React Testing Library's RenderOptions
 * @interface CustomRenderOptions
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Override default route for Router testing */
  initialEntries?: string[];
}

/**
 * All-in-one providers wrapper for testing components
 * @component AllTheProviders
 * @description Wraps components with all necessary providers including
 * QueryClient, Router, and Wallet context for comprehensive testing
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Create a fresh QueryClient instance for each test to prevent state leakage
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests for faster execution
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WalletStateProvider>
          {children}
        </WalletStateProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

/**
 * Custom render function with all providers included
 * @function customRender
 * @description Renders React components with all necessary providers,
 * eliminating the need to wrap each test with provider setup
 * 
 * @param {ReactElement} ui - The React component to render
 * @param {CustomRenderOptions} options - Render options including custom initial entries
 * @returns {RenderResult} Testing Library render result with all queries
 * 
 * @example
 * ```typescript
 * import { customRender } from '@/test/test-utils';
 * import MyComponent from '@/components/MyComponent';
 * 
 * test('renders MyComponent', () => {
 *   customRender(<MyComponent />);
 *   expect(screen.getByText('Hello')).toBeInTheDocument();
 * });
 * ```
 */
const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * Mock wallet provider for testing wallet-dependent components
 * @function createMockWallet
 * @description Creates a mock wallet object with default values for testing
 * components that depend on wallet state
 * 
 * @param {Partial<any>} overrides - Properties to override in the mock wallet
 * @returns {object} Mock wallet object with standard properties
 * 
 * @example
 * ```typescript
 * const mockWallet = createMockWallet({ 
 *   connected: true, 
 *   publicKey: 'test-public-key' 
 * });
 * ```
 */
export const createMockWallet = (overrides: Partial<any> = {}) => ({
  connected: false,
  connecting: false,
  publicKey: null,
  walletName: 'Test Wallet',
  connect: vi.fn(),
  disconnect: vi.fn(),
  ...overrides,
});

/**
 * Mock Solana API responses for testing
 * @function createMockSolanaAPI
 * @description Creates mock API responses for testing components that
 * interact with Solana blockchain data
 * 
 * @param {Partial<any>} overrides - Properties to override in the mock API
 * @returns {object} Mock API object with standard methods and data
 * 
 * @example
 * ```typescript
 * const mockAPI = createMockSolanaAPI({ 
 *   balance: { sol: 1.5, usdValue: 150 } 
 * });
 * ```
 */
export const createMockSolanaAPI = (overrides: Partial<any> = {}) => ({
  balance: { sol: 0, usdValue: 0, change24h: 0 },
  tokens: [],
  loading: false,
  error: null,
  ...overrides,
});

// Create screen object with all queries
export const screen = RTL.screen;

// Create fireEvent object
export const fireEvent = {
  click: (element: Element) => {
    element.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));
  },
  change: (element: Element, options: { target: { value: any } }) => {
    const { value } = options.target;
    if (element instanceof HTMLInputElement) {
      element.value = value;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
  submit: (element: Element) => {
    element.dispatchEvent(new Event('submit', { bubbles: true }));
  },
};

// Re-export everything from testing library for convenience
export * from '@testing-library/react';
export { customRender as render };
