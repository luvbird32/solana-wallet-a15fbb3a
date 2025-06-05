
import React, { lazy, Suspense } from 'react';
import { useWalletState } from '@/contexts/WalletStateContext';
import { useSolanaAPI } from '@/hooks/useSolanaAPI';
import WalletBalance from './WalletBalance';
import WalletTabs from './WalletTabs';
import ErrorBoundary from './ErrorBoundary';
import { 
  TokensLoadingSkeleton, 
  TransactionLoadingSkeleton 
} from './WalletLoadingStates';

// Lazy load heavy components
const TokenList = lazy(() => import('./TokenList'));
const NFTGallery = lazy(() => import('./NFTGallery'));
const TransactionHistory = lazy(() => import('./TransactionHistory'));

const WalletMainContent = () => {
  const { state, dispatch } = useWalletState();
  const { balance } = useSolanaAPI();

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

  return (
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
  );
};

export default WalletMainContent;
