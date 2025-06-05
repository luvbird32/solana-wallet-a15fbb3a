
/**
 * @fileoverview Unit tests for WalletConnectionButton component
 * @description Tests wallet connection states, button interactions,
 * and accessibility features of the wallet connection interface
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render, createMockWallet } from '@/test/test-utils';
import WalletConnectionButton from '@/components/WalletConnectionButton';
import * as walletHook from '@/hooks/useWallet';
import * as addressHook from '@/hooks/useAddressFormatting';

// Mock the wallet hook
vi.mock('@/hooks/useWallet');
vi.mock('@/hooks/useAddressFormatting');

/**
 * Test suite for WalletConnectionButton component
 * @description Comprehensive tests covering different wallet states,
 * user interactions, and accessibility requirements
 */
describe('WalletConnectionButton', () => {
  const mockConnect = vi.fn();
  const mockDisconnect = vi.fn();
  const mockFormatPublicKey = vi.fn();
  const mockCopyToClipboard = vi.fn();

  /**
   * Setup function that runs before each test
   * @description Resets all mocks and sets up default hook implementations
   * to ensure test isolation and consistent starting state
   */
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the address formatting hook
    vi.mocked(addressHook.useAddressFormatting).mockReturnValue({
      formatPublicKey: mockFormatPublicKey,
      formatAddress: vi.fn(),
      isValidSolanaAddress: vi.fn(),
      copyToClipboard: mockCopyToClipboard,
    });
    
    mockFormatPublicKey.mockReturnValue('ABC...XYZ');
  });

  /**
   * Test wallet disconnected state display and functionality
   * @description Verifies that disconnected state shows connect button
   * with proper text and triggers connect function when clicked
   */
  it('should render connect button when wallet is disconnected', () => {
    // Arrange: Mock wallet as disconnected
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: false,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render the component
    render(<WalletConnectionButton />);

    // Assert: Check that connect button is displayed with correct text
    const connectButton = screen.getByRole('button', { name: /connect your solana wallet/i });
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveTextContent('Connect Wallet');
  });

  /**
   * Test wallet connecting state display and user feedback
   * @description Verifies that connecting state shows appropriate loading
   * indicators and disables interaction during connection process
   */
  it('should render connecting state with loading indicators', () => {
    // Arrange: Mock wallet as connecting
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: true,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render the component
    render(<WalletConnectionButton />);

    // Assert: Check that connecting state is displayed
    const connectingButton = screen.getByRole('button', { name: /connecting to wallet/i });
    expect(connectingButton).toBeInTheDocument();
    expect(connectingButton).toHaveTextContent('Connecting...');
    expect(connectingButton).toBeDisabled();
  });

  /**
   * Test wallet connected state display with wallet information
   * @description Verifies that connected state shows wallet name,
   * formatted public key, and disconnect functionality
   */
  it('should render connected state with wallet info and disconnect button', () => {
    // Arrange: Mock wallet as connected with test data
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: true,
        connecting: false,
        publicKey: 'test-public-key-123456789',
        walletName: 'Phantom',
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render the component
    render(<WalletConnectionButton />);

    // Assert: Check that connected state displays wallet information
    expect(screen.getByText('Phantom')).toBeInTheDocument();
    expect(screen.getByText('ABC...XYZ')).toBeInTheDocument();
    
    const disconnectButton = screen.getByRole('button', { name: /disconnect from phantom wallet/i });
    expect(disconnectButton).toBeInTheDocument();
  });

  /**
   * Test connect button click functionality
   * @description Verifies that clicking the connect button triggers
   * the wallet connection process through the useWallet hook
   */
  it('should call connect function when connect button is clicked', () => {
    // Arrange: Mock wallet as disconnected
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: false,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render component and click connect button
    render(<WalletConnectionButton />);
    const connectButton = screen.getByRole('button', { name: /connect your solana wallet/i });
    fireEvent.click(connectButton);

    // Assert: Verify connect function was called
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });

  /**
   * Test disconnect button click functionality
   * @description Verifies that clicking the disconnect button triggers
   * the wallet disconnection process and updates the UI state
   */
  it('should call disconnect function when disconnect button is clicked', () => {
    // Arrange: Mock wallet as connected
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: true,
        connecting: false,
        publicKey: 'test-public-key',
        walletName: 'Phantom',
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render component and click disconnect button
    render(<WalletConnectionButton />);
    const disconnectButton = screen.getByRole('button', { name: /disconnect from phantom wallet/i });
    fireEvent.click(disconnectButton);

    // Assert: Verify disconnect function was called
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  /**
   * Test accessibility attributes and ARIA labels
   * @description Verifies that the component provides proper accessibility
   * attributes for screen readers and keyboard navigation
   */
  it('should have proper accessibility attributes', () => {
    // Arrange: Mock wallet as disconnected
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: false,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render the component
    render(<WalletConnectionButton />);

    // Assert: Check accessibility attributes
    const connectButton = screen.getByRole('button', { name: /connect your solana wallet/i });
    expect(connectButton).toHaveAttribute('aria-label', 'Connect your Solana wallet');
  });

  /**
   * Test public key formatting integration
   * @description Verifies that the component properly integrates with
   * the address formatting hook to display truncated public keys
   */
  it('should format public key correctly when connected', () => {
    // Arrange: Set up specific formatting expectation
    const testPublicKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    mockFormatPublicKey.mockReturnValue('ABCD...6789');
    
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: true,
        publicKey: testPublicKey,
        walletName: 'Test Wallet',
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    // Act: Render the component
    render(<WalletConnectionButton />);

    // Assert: Check that formatting function was called and result is displayed
    expect(mockFormatPublicKey).toHaveBeenCalledWith(testPublicKey);
    expect(screen.getByText('ABCD...6789')).toBeInTheDocument();
  });
});
