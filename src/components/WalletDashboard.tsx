
import React, { useState, lazy, Suspense } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletHeader from './WalletHeader';
import WalletConnectionPrompt from './WalletConnectionPrompt';
import WalletBalance from './WalletBalance';
import WalletTabs from './WalletTabs';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const TokenList = lazy(() => import('./TokenList'));
const NFTGallery = lazy(() => import('./NFTGallery'));
const TransactionHistory = lazy(() => import('./TransactionHistory'));
const SendReceiveModal = lazy(() => import('./SendReceiveModal'));
const SwapInterface = lazy(() => import('./SwapInterface'));
const WalletManagement = lazy(() => import('./WalletManagement'));

const ComponentSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid gap-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

const WalletDashboard = () => {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('tokens');
  const [showSendReceive, setShowSendReceive] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [showWalletManagement, setShowWalletManagement] = useState(false);
  const [sendReceiveMode, setSendReceiveMode] = useState<'send' | 'receive'>('send');

  // Mock data - in real app this would come from connected wallet
  const walletBalance = 45.67;
  const usdValue = 2834.21;
  const change24h = 5.23;

  const handleSendClick = () => {
    setSendReceiveMode('send');
    setShowSendReceive(true);
  };

  const handleReceiveClick = () => {
    setSendReceiveMode('receive');
    setShowSendReceive(true);
  };

  if (showWalletManagement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<ComponentSkeleton />}>
            <WalletManagement onBack={() => setShowWalletManagement(false)} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <WalletHeader
          onShowWalletManagement={() => setShowWalletManagement(true)}
        />

        {!connected ? (
          <WalletConnectionPrompt
            onShowWalletManagement={() => setShowWalletManagement(true)}
          />
        ) : (
          <>
            <WalletBalance
              walletBalance={walletBalance}
              usdValue={usdValue}
              change24h={change24h}
              onSendClick={handleSendClick}
              onReceiveClick={handleReceiveClick}
              onSwapClick={() => setShowSwap(true)}
            />

            <WalletTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="animate-fade-in">
              <Suspense fallback={<ComponentSkeleton />}>
                {activeTab === 'tokens' && <TokenList />}
                {activeTab === 'nfts' && <NFTGallery />}
                {activeTab === 'history' && <TransactionHistory />}
              </Suspense>
            </div>
          </>
        )}

        {/* Modals with lazy loading */}
        {showSendReceive && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><Skeleton className="w-96 h-96" /></div>}>
            <SendReceiveModal
              mode={sendReceiveMode}
              isOpen={showSendReceive}
              onClose={() => setShowSendReceive(false)}
            />
          </Suspense>
        )}
        
        {showSwap && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><Skeleton className="w-96 h-96" /></div>}>
            <SwapInterface onClose={() => setShowSwap(false)} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
