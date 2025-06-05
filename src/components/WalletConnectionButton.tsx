
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Power, Zap, Shield } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useAddressFormatting } from '@/hooks/useAddressFormatting';
import { TRANSITIONS, SIZES, EFFECTS, BACKGROUND_COLORS, BORDER_COLORS } from '@/constants/ui';

const WalletConnectionButton = () => {
  const { connected, publicKey, connecting, connect, disconnect, walletName } = useWallet();
  const { formatPublicKey } = useAddressFormatting();

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-3" role="group" aria-label="Connected wallet information">
        <div 
          className={`${BACKGROUND_COLORS.SUCCESS} ${BORDER_COLORS.SUCCESS} border-2 px-4 py-2 ${SIZES.BORDER_RADIUS_LG} shadow-lg backdrop-blur-sm`}
          role="status"
          aria-label={`Connected to ${walletName} wallet`}
        >
          <div className="flex items-center gap-2">
            <div className="relative" aria-hidden="true">
              <div className="w-3 h-3 bg-success rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-success rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className={SIZES.ICON_SM} aria-hidden="true" />
              <span className="text-success font-bold text-sm">{walletName}</span>
            </div>
          </div>
          <p 
            className="text-success text-xs font-mono mt-1 bg-white/50 px-2 py-1 rounded-lg"
            aria-label={`Wallet address: ${publicKey}`}
          >
            {formatPublicKey(publicKey)}
          </p>
        </div>
        <Button
          onClick={disconnect}
          variant="wallet-disconnect"
          size="default"
          className={TRANSITIONS.BUTTON_HOVER}
          aria-label={`Disconnect from ${walletName} wallet`}
        >
          <Power className={`${SIZES.ICON_SM} mr-2`} aria-hidden="true" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      disabled={connecting}
      variant="wallet-connect"
      size="wallet"
      className={`${TRANSITIONS.BUTTON_HOVER} ${TRANSITIONS.SCALE_HOVER} disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={connecting ? "Connecting to wallet, please wait" : "Connect your Solana wallet"}
      aria-describedby={connecting ? "connection-status" : undefined}
    >
      <Wallet className={`${SIZES.ICON_SM} mr-2`} aria-hidden="true" />
      {connecting ? (
        <>
          <Zap className={`${SIZES.ICON_SM} mr-2 animate-pulse`} aria-hidden="true" />
          <span id="connection-status">Connecting...</span>
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
};

export default WalletConnectionButton;
