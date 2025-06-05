
import React, { lazy, Suspense } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useWalletState } from '@/contexts/WalletStateContext';
import WalletHeader from './WalletHeader';
import WalletDashboardLayout from './WalletDashboardLayout';
import WalletMainContent from './WalletMainContent';
import WalletModals from './WalletModals';
import ErrorBoundary from './ErrorBoundary';
import { 
  TokensLoadingSkeleton, 
  WalletConnectingLoader 
} from './WalletLoadingStates';

// Lazy load heavy components
const WalletConnectionPrompt = lazy(() => import('./WalletConnectionPrompt'));
const WalletManagement = lazy(() => import('./WalletManagement'));

const WalletDashboard = () => {
  const { connected, connecting } = useWallet();
  const { state, dispatch } = useWalletState();

  if (state.showWalletManagement) {
    return (
      <WalletDashboardLayout>
        <ErrorBoundary>
          <Suspense fallback={<TokensLoadingSkeleton />}>
            <WalletManagement onBack={() => dispatch({ type: 'TOGGLE_WALLET_MANAGEMENT', payload: false })} />
          </Suspense>
        </ErrorBoundary>
      </WalletDashboardLayout>
    );
  }

  return (
    <WalletDashboardLayout>
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
        <WalletMainContent />
      )}

      <WalletModals />
    </WalletDashboardLayout>
  );
};

export default WalletDashboard;
