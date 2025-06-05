
import React, { lazy, Suspense } from 'react';
import { useWalletState } from '@/contexts/WalletStateContext';
import ErrorBoundary from './ErrorBoundary';
import { WalletConnectingLoader } from './WalletLoadingStates';

// Lazy load modal components
const SendReceiveModal = lazy(() => import('./SendReceiveModal'));
const SwapInterface = lazy(() => import('./SwapInterface'));

const WalletModals = () => {
  const { state, dispatch } = useWalletState();

  return (
    <>
      {/* Send/Receive Modal */}
      {state.showSendReceive && (
        <ErrorBoundary>
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading send/receive modal">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <WalletConnectingLoader />
              </div>
            </div>
          }>
            <SendReceiveModal
              mode={state.sendReceiveMode}
              isOpen={state.showSendReceive}
              onClose={() => dispatch({ type: 'TOGGLE_SEND_RECEIVE', payload: { show: false } })}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      
      {/* Swap Modal */}
      {state.showSwap && (
        <ErrorBoundary>
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-label="Loading swap interface">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <WalletConnectingLoader />
              </div>
            </div>
          }>
            <SwapInterface onClose={() => dispatch({ type: 'TOGGLE_SWAP', payload: false })} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default WalletModals;
