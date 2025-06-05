import React, { useState, lazy, Suspense } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useWalletState } from '@/contexts/WalletStateContext';
import { useSolanaAPI } from '@/hooks/useSolanaAPI';
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
  const { state, dispatch } = useWalletState();
  const { balance, tokens, loading: apiLoading } = useSolanaAPI();

  const handleSendClick = () => {
    dispatch({ type: 'TOGGLE_SEND_RECEIVE', payload: { show: true, mode: 'send' } });
  };

  const handleReceiveClick = () => {
    dispatch({ type: 'TOGGLE_SEND_RECEIVE', payload: { show: true, mode: 'receive' } });
  };

  const getTabLoadingSkeleton = () => {
    switch (state.activeTab) {
      case 'tokens':
        return <TokensLoadingSkeleton />;
      case 'history':
        return <TransactionLoadingSkeleton />;
      default:
        return <TokensLoadingSkeleton />;
    }
  };

  if (state.showWalletManagement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-alt p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <ErrorBoundary>
            <Suspense fallback={<TokensLoadingSkeleton />}>
              <WalletManagement onBack={() => dispatch({ type: 'TOGGLE_WALLET_MANAGEMENT', payload: false })} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-alt p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <WalletHeader
          onShowWalletManagement={() => dispatch({ type: 'TOGGLE_WALLET_MANAGEMENT', payload: true })}
        />

        {connecting ? (
          <WalletConnectingLoader />
        ) : !connected ? (
          <ErrorBoundary>
            <Suspense fallback={<WalletConnectingLoader />}>
              <WalletConnectionPrompt
                onShowWalletManagement={() => dispatch({ type: 'TOGGLE_WALLET_MANAGEMENT', payload: true })}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <>
            <WalletBalance
              walletBalance={balance?.sol || 0}
              usdValue={balance?.usdValue || 0}
              change24h={balance?.change24h || 0}
              onSendClick={handleSendClick}
              onReceiveClick={handleReceiveClick}
              onSwapClick={() => dispatch({ type: 'TOGGLE_SWAP', payload: true })}
            />

            <WalletTabs
              activeTab={state.activeTab}
              onTabChange={(tab) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })}
            />

            <div className="animate-fade-in">
              <ErrorBoundary>
                <Suspense fallback={getTabLoadingSkeleton()}>
                  {state.activeTab === 'tokens' && <TokenList />}
                  {state.activeTab === 'nfts' && <NFTGallery />}
                  {state.activeTab === 'history' && <TransactionHistory />}
                </Suspense>
              </ErrorBoundary>
            </div>
          </>
        )}

        {/* Modals with error boundaries */}
        {state.showSendReceive && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading send/receive modal"><div className="bg-white p-8 rounded-lg shadow-xl"><WalletConnectingLoader /></div></div>}>
              <SendReceiveModal
                mode={state.sendReceiveMode}
                isOpen={state.showSendReceive}
                onClose={() => dispatch({ type: 'TOGGLE_SEND_RECEIVE', payload: { show: false } })}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        
        {state.showSwap && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading swap interface"><div className="bg-white p-8 rounded-lg shadow-xl"><WalletConnectingLoader /></div></div>}>
              <SwapInterface onClose={() => dispatch({ type: 'TOGGLE_SWAP', payload: false })} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
