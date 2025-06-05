
/**
 * @fileoverview Tests for WalletConnectionButton wallet connection states
 * @description Tests disconnected, connecting, and connected states display
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, createMockWallet, screen } from '@/test/test-utils';
import WalletConnectionButton from '@/components/WalletConnectionButton';
import * as walletHook from '@/hooks/useWallet';
import * as addressHook from '@/hooks/useAddressFormatting';

vi.mock('@/hooks/useWallet');
vi.mock('@/hooks/useAddressFormatting');

describe('WalletConnectionButton - Connection States', () => {
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

  it('should render connect button when wallet is disconnected', () => {
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
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveTextContent('Connect Wallet');
  });

  it('should render connecting state with loading indicators', () => {
    vi.mocked(walletHook.useWallet).mockReturnValue(
      createMockWallet({
        connected: false,
        connecting: true,
        connect: mockConnect,
        disconnect: mockDisconnect,
      })
    );

    render(<WalletConnectionButton />);

    const connectingButton = screen.getByRole('button', { name: /connecting to wallet/i });
    expect(connectingButton).toBeInTheDocument();
    expect(connectingButton).toHaveTextContent('Connecting...');
    expect(connectingButton).toBeDisabled();
  });

  it('should render connected state with wallet info and disconnect button', () => {
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

    render(<WalletConnectionButton />);

    expect(screen.getByText('Phantom')).toBeInTheDocument();
    expect(screen.getByText('ABC...XYZ')).toBeInTheDocument();
    
    const disconnectButton = screen.getByRole('button', { name: /disconnect from phantom wallet/i });
    expect(disconnectButton).toBeInTheDocument();
  });
});
