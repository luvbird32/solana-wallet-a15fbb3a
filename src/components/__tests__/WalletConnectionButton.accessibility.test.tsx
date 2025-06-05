
/**
 * @fileoverview Tests for WalletConnectionButton accessibility features
 * @description Tests ARIA labels, keyboard navigation, and screen reader support
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, createMockWallet } from '@/test/test-utils';
import WalletConnectionButton from '@/components/WalletConnectionButton';
import * as walletHook from '@/hooks/useWallet';
import * as addressHook from '@/hooks/useAddressFormatting';

vi.mock('@/hooks/useWallet');
vi.mock('@/hooks/useAddressFormatting');

describe('WalletConnectionButton - Accessibility', () => {
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
    
    mockFormatPublicKey.mockReturnValue('ABC...XYZ');
  });

  it('should have proper accessibility attributes', () => {
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: false,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    render(<WalletConnectionButton />);

    const connectButton = screen.getByRole('button', { name: /connect your solana wallet/i });
    expect(connectButton).toHaveAttribute('aria-label', 'Connect your Solana wallet');
  });
});
