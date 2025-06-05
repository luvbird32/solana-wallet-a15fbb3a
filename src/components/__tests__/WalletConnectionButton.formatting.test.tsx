
/**
 * @fileoverview Tests for WalletConnectionButton address formatting integration
 * @description Tests public key formatting and display functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import { render, createMockWallet } from '@/test/test-utils';
import WalletConnectionButton from '@/components/WalletConnectionButton';
import * as walletHook from '@/hooks/useWallet';
import * as addressHook from '@/hooks/useAddressFormatting';

vi.mock('@/hooks/useWallet');
vi.mock('@/hooks/useAddressFormatting');

describe('WalletConnectionButton - Address Formatting', () => {
  const mockConnect = vi.fn();
  const mockDisconnect = vi.fn();
  const mockFormatPublicKey = vi.fn();
  const mockCopyToClipboard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(addressHook.useAddressFormatting).mockReturnValue({
      formatPublicKey: mockFormatPublicKey,
      formatAddress: vi.fn(),
      isValidSolanaAddress: vi.fn(),
      copyToClipboard: mockCopyToClipboard,
    });
  });

  it('should format public key correctly when connected', () => {
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

    render(<WalletConnectionButton />);

    expect(mockFormatPublicKey).toHaveBeenCalledWith(testPublicKey);
    expect(screen.getByText('ABCD...6789')).toBeInTheDocument();
  });
});
