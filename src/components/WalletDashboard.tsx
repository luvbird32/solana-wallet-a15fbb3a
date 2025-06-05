
import React, { useState, lazy, Suspense } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletHeader from './WalletHeader';
import WalletBalance from './WalletBalance';
import WalletTabs from './WalletTabs';
import ErrorBoundary from './ErrorBoundary';
import { 
  TokensLoadingSkeleton, 
  TransactionLoadingSkeleton, 
  WalletConnectingLoader 
} from './WalletLoadingStates';

// Lazy load heavy components
const WalletConnectionPrompt = lazy(() => import('./WalletConnectionPrompt'));
const TokenList = lazy(() => import('./TokenList'));
const NFTGallery = lazy(() => import('./NFTGallery'));
const TransactionHistory = lazy(() => import('./TransactionHistory'));
const SendReceiveModal = lazy(() => import('./SendReceiveModal'));
const SwapInterface = lazy(() => import('./SwapInterface'));
const WalletManagement = lazy(() => import('./WalletManagement'));

const WalletDashboard = () => {
  const { connected, connecting } = useWallet();
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

  const getTabLoadingSkeleton = () => {
    switch (activeTab) {
      case 'tokens':
        return <TokensLoadingSkeleton />;
      case 'history':
        return <TransactionLoadingSkeleton />;
      default:
        return <TokensLoadingSkeleton />;
    }
  };

  if (showWalletManagement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <ErrorBoundary>
            <Suspense fallback={<TokensLoadingSkeleton />}>
              <WalletManagement onBack={() => setShowWalletManagement(false)} />
            </Suspense>
          </ErrorBoundary>
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

        {connecting ? (
          <WalletConnectingLoader />
        ) : !connected ? (
          <ErrorBoundary>
            <Suspense fallback={<WalletConnectingLoader />}>
              <WalletConnectionPrompt
                onShowWalletManagement={() => setShowWalletManagement(true)}
              />
            </Suspense>
          </ErrorBoundary>
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
              <ErrorBoundary>
                <Suspense fallback={getTabLoadingSkeleton()}>
                  {activeTab === 'tokens' && <TokenList />}
                  {activeTab === 'nfts' && <NFTGallery />}
                  {activeTab === 'history' && <TransactionHistory />}
                </Suspense>
              </ErrorBoundary>
            </div>
          </>
        )}

        {/* Modals with error boundaries */}
        {showSendReceive && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading send/receive modal"><div className="bg-white p-8 rounded-lg shadow-xl"><WalletConnectingLoader /></div></div>}>
              <SendReceiveModal
                mode={sendReceiveMode}
                isOpen={showSendReceive}
                onClose={() => setShowSendReceive(false)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        
        {showSwap && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading swap interface"><div className="bg-white p-8 rounded-lg shadow-xl"><WalletConnectingLoader /></div></div>}>
              <SwapInterface onClose={() => setShowSwap(false)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
