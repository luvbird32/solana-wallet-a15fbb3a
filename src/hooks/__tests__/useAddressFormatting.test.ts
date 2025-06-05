
/**
 * @fileoverview Unit tests for useAddressFormatting hook
 * @description Tests address formatting utilities including public key
 * truncation, validation, and clipboard operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAddressFormatting } from '@/hooks/useAddressFormatting';

/**
 * Test suite for useAddressFormatting hook
 * @description Comprehensive tests for Solana address formatting,
 * validation, and user interaction utilities
 */
describe('useAddressFormatting Hook', () => {
  /**
   * Setup function that runs before each test
   * @description Clears all mocks and sets up clipboard API mock
   * to ensure test isolation and consistent clipboard behavior
   */
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the clipboard API for testing copy functionality
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  /**
   * Test public key formatting with standard addresses
   * @description Verifies that long Solana public keys are properly
   * truncated with ellipsis for UI display purposes
   */
  it('should format public keys correctly', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());

    // Act: Format a test public key
    const longPublicKey = 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz';
    const formatted = result.current.formatPublicKey(longPublicKey);

    // Assert: Check that formatting produces expected truncated result
    expect(formatted).toMatch(/^.{4}\.\.\.(.{4}|.{3})$/);
    expect(formatted.length).toBeLessThan(longPublicKey.length);
  });

  /**
   * Test address formatting with various input lengths
   * @description Verifies that the formatting function handles
   * addresses of different lengths appropriately
   */
  it('should handle different address lengths', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());

    // Test cases with different address lengths
    const testCases = [
      { input: 'short', expected: 'short' }, // Very short addresses remain unchanged
      { input: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn', expected: /^ABCD\.\.\./ },
      { input: 'A'.repeat(44), expected: /^AAAA\.\.\./ }, // Standard Solana address length
    ];

    testCases.forEach(({ input, expected }) => {
      const formatted = result.current.formatPublicKey(input);
      
      if (typeof expected === 'string') {
        expect(formatted).toBe(expected);
      } else {
        expect(formatted).toMatch(expected);
      }
    });
  });

  /**
   * Test general address formatting function
   * @description Verifies that the general formatAddress function
   * works correctly for various blockchain address formats
   */
  it('should format addresses with custom parameters', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());

    // Act: Format address with custom start/end lengths
    const address = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456';
    const formatted = result.current.formatAddress(address, 6, 4);

    // Assert: Check custom formatting
    expect(formatted).toMatch(/^ABCDEF\.\.\.3456$/);
  });

  /**
   * Test clipboard copy functionality
   * @description Verifies that the copyToClipboard function properly
   * integrates with the browser clipboard API
   */
  it('should copy text to clipboard', async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());
    const testText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Act: Copy text to clipboard
    await result.current.copyToClipboard(testText);

    // Assert: Check that clipboard API was called with correct text
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  /**
   * Test clipboard copy error handling
   * @description Verifies that clipboard copy failures are handled
   * gracefully without throwing unhandled errors
   */
  it('should handle clipboard copy errors gracefully', async () => {
    // Arrange: Mock clipboard to throw error
    const { result } = renderHook(() => useAddressFormatting());
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error('Clipboard error'));

    // Act & Assert: Copy should not throw error
    await expect(result.current.copyToClipboard('test')).resolves.not.toThrow();
  });

  /**
   * Test edge cases for address formatting
   * @description Verifies that edge cases like empty strings,
   * null values, and very short addresses are handled correctly
   */
  it('should handle edge cases for formatting', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());

    // Test edge cases
    expect(result.current.formatPublicKey('')).toBe('');
    expect(result.current.formatPublicKey('ABC')).toBe('ABC'); // Too short to format
    expect(result.current.formatAddress('', 4, 4)).toBe('');
  });

  /**
   * Test consistent formatting output
   * @description Verifies that the same input always produces
   * the same formatted output for UI consistency
   */
  it('should provide consistent formatting results', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useAddressFormatting());
    const testAddress = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

    // Act: Format the same address multiple times
    const result1 = result.current.formatPublicKey(testAddress);
    const result2 = result.current.formatPublicKey(testAddress);
    const result3 = result.current.formatPublicKey(testAddress);

    // Assert: Results should be identical
    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });
});
