
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Settings, Sparkles } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { STATUS_COLORS, SIZES, TRANSITIONS } from '@/constants/ui';
import WalletConnectionButton from './WalletConnectionButton';

interface WalletHeaderProps {
  onShowWalletManagement: () => void;
}

const WalletHeader = React.memo(({ onShowWalletManagement }: WalletHeaderProps) => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className={`w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl ${TRANSITIONS.SCALE_HOVER}`}>
            <Wallet className={`${SIZES.ICON_MD} text-primary-foreground`} />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-2.5 h-2.5 text-warning-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground">
            Solana Wallet
          </h1>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg relative ${
              connected ? 'bg-success shadow-success/50' : 'bg-warning shadow-warning/50'
            }`}>
              <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-20 ${
                connected ? 'bg-success' : 'bg-warning'
              }`}></div>
            </div>
            <p className={`text-sm font-bold ${
              connected ? STATUS_COLORS.SUCCESS : STATUS_COLORS.WARNING
            }`}>
              {connected ? '🟢 Wallet Connected' : '🟡 Wallet Not Connected'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={onShowWalletManagement}
          variant="management-action"
          size="default"
          className={TRANSITIONS.BUTTON_HOVER}
        >
          <Settings className={`${SIZES.ICON_SM} mr-2`} />
          Wallet Management
        </Button>
        <WalletConnectionButton />
      </div>
    </div>
  );
});

WalletHeader.displayName = 'WalletHeader';

export default WalletHeader;
