
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Power, Zap, Shield } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useAddressFormatting } from '@/hooks/useAddressFormatting';
import { TRANSITIONS, SIZES } from '@/constants/ui';

const WalletConnectionButton = () => {
  const { connected, publicKey, connecting, connect, disconnect, walletName } = useWallet();
  const { formatPublicKey } = useAddressFormatting();

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-3" role="group" aria-label="Connected wallet information">
        <div 
          className="bg-emerald-50 border-2 border-emerald-200 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm"
          role="status"
          aria-label={`Connected to ${walletName} wallet`}
        >
          <div className="flex items-center gap-2">
            <div className="relative" aria-hidden="true">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className={SIZES.ICON_SM} aria-hidden="true" />
              <span className="text-emerald-700 font-bold text-sm">{walletName}</span>
            </div>
          </div>
          <p 
            className="text-emerald-600 text-xs font-mono mt-1 bg-white/50 px-2 py-1 rounded-lg"
            aria-label={`Wallet address: ${publicKey}`}
          >
            {formatPublicKey(publicKey)}
          </p>
        </div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="default"
          className={`bg-red-50 border-2 border-red-200 hover:border-red-300 text-red-600 hover:bg-red-100 ${TRANSITIONS.BUTTON_HOVER} font-bold px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl`}
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
      size="default"
      className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 shadow-xl hover:shadow-2xl backdrop-blur-md font-bold rounded-2xl ${TRANSITIONS.BUTTON_HOVER} ${TRANSITIONS.SCALE_HOVER} border-0 disabled:opacity-50 disabled:cursor-not-allowed`}
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
