
/**
 * @fileoverview Tests for WalletConnectionButton user interactions
 * @description Tests button click functionality and user interaction flows
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, createMockWallet, screen, fireEvent } from '@/test/test-utils';
import WalletConnectionButton from '@/components/WalletConnectionButton';
import * as walletHook from '@/hooks/useWallet';
import * as addressHook from '@/hooks/useAddressFormatting';

vi.mock('@/hooks/useWallet');
vi.mock('@/hooks/useAddressFormatting');

describe('WalletConnectionButton - User Interactions', () => {
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

  it('should call connect function when connect button is clicked', () => {
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
    fireEvent.click(connectButton);

    expect(mockConnect).toHaveBeenCalledTimes(1);
  });

  it('should call disconnect function when disconnect button is clicked', () => {
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

    render(<WalletConnectionButton />);
    const disconnectButton = screen.getByRole('button', { name: /disconnect from phantom wallet/i });
    fireEvent.click(disconnectButton);

    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
