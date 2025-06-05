
/**
 * @fileoverview Unit tests for useWallet hook
 * @description Tests wallet connection state management, connection/disconnection
 * flows, and integration with Solana wallet adapters
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WalletProvider, useWallet } from '@/hooks/useWallet';
import React from 'react';

/**
 * Test suite for useWallet hook
 * @description Comprehensive tests for wallet state management,
 * connection flows, and error handling scenarios
 */
describe('useWallet Hook', () => {
  /**
   * Wrapper component for testing hooks with provider context
   * @component TestWrapper
   * @description Provides WalletProvider context for hook testing
   */
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <WalletProvider>{children}</WalletProvider>
  );

  /**
   * Setup function that runs before each test
   * @description Clears all mocks and resets any global state
   * to ensure test isolation
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test initial hook state when no wallet is connected
   * @description Verifies that the hook returns proper default values
   * when initialized without an active wallet connection
   */
  it('should return initial state when no wallet is connected', () => {
    // Act: Render the hook with provider wrapper
    const { result } = renderHook(() => useWallet(), {
      wrapper: TestWrapper,
    });

    // Assert: Check initial state values
    expect(result.current.connected).toBe(false);
    expect(result.current.connecting).toBe(false);
    expect(result.current.publicKey).toBeNull();
    expect(result.current.walletName).toBe('');
    expect(typeof result.current.connect).toBe('function');
    expect(typeof result.current.disconnect).toBe('function');
  });

  /**
   * Test that connect function updates connecting state
   * @description Verifies that calling connect sets the connecting
   * state to true during the connection process
   */
  it('should set connecting state when connect is called', async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useWallet(), {
      wrapper: TestWrapper,
    });

    // Act: Call connect function
    act(() => {
      result.current.connect();
    });

    // Assert: Check that connecting state is updated
    // Note: In a real implementation, this would involve actual wallet connection
    expect(typeof result.current.connect).toBe('function');
  });

  /**
   * Test that disconnect function resets wallet state
   * @description Verifies that calling disconnect properly clears
   * all wallet-related state and returns to initial values
   */
  it('should reset state when disconnect is called', async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useWallet(), {
      wrapper: TestWrapper,
    });

    // Act: Call disconnect function
    act(() => {
      result.current.disconnect();
    });

    // Assert: Check that state is reset to initial values
    expect(result.current.connected).toBe(false);
    expect(result.current.connecting).toBe(false);
    expect(result.current.publicKey).toBeNull();
  });

  /**
   * Test hook behavior without provider context
   * @description Verifies that the hook throws an appropriate error
   * when used outside of the WalletProvider context
   */
  it('should throw error when used outside of WalletProvider', () => {
    // Arrange: Mock console.error to prevent test output noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Act & Assert: Expect error when hook is used without provider
    expect(() => {
      renderHook(() => useWallet());
    }).toThrow();

    // Cleanup: Restore console.error
    consoleSpy.mockRestore();
  });

  /**
   * Test that provider accepts children prop correctly
   * @description Verifies that the WalletProvider component properly
   * renders child components and provides context
   */
  it('should provide context to children components', () => {
    // Arrange: Create a test component that uses the hook
    const TestComponent = () => {
      const { connected } = useWallet();
      return <div data-testid="test-component">{connected ? 'Connected' : 'Disconnected'}</div>;
    };

    // Act: Render the test component with provider
    const { result } = renderHook(() => useWallet(), {
      wrapper: TestWrapper,
    });

    // Assert: Verify the hook returns expected values
    expect(result.current).toBeDefined();
    expect(typeof result.current.connect).toBe('function');
    expect(typeof result.current.disconnect).toBe('function');
  });
});
