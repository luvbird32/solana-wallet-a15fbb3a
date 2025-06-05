
import React, { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletHeader from './WalletHeader';
import WalletConnectionPrompt from './WalletConnectionPrompt';
import WalletBalance from './WalletBalance';
import WalletTabs from './WalletTabs';
import TokenList from './TokenList';
import NFTGallery from './NFTGallery';
import TransactionHistory from './TransactionHistory';
import SendReceiveModal from './SendReceiveModal';
import SwapInterface from './SwapInterface';
import WalletManagement from './WalletManagement';

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
          <WalletManagement onBack={() => setShowWalletManagement(false)} />
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
              {activeTab === 'tokens' && <TokenList />}
              {activeTab === 'nfts' && <NFTGallery />}
              {activeTab === 'history' && <TransactionHistory />}
            </div>
          </>
        )}

        {/* Modals */}
        {showSendReceive && (
          <SendReceiveModal
            mode={sendReceiveMode}
            onClose={() => setShowSendReceive(false)}
          />
        )}
        
        {showSwap && (
          <SwapInterface onClose={() => setShowSwap(false)} />
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
