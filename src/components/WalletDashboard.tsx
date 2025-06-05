
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import TokenList from './TokenList';
import NFTGallery from './NFTGallery';
import TransactionHistory from './TransactionHistory';
import SendReceiveModal from './SendReceiveModal';
import SwapInterface from './SwapInterface';

const WalletDashboard = () => {
  const [activeTab, setActiveTab] = useState('tokens');
  const [showSendReceive, setShowSendReceive] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [sendReceiveMode, setSendReceiveMode] = useState<'send' | 'receive'>('send');

  // Mock data - in real app this would come from Solana connection
  const walletBalance = 45.67;
  const usdValue = 2834.21;

  const handleSendClick = () => {
    setSendReceiveMode('send');
    setShowSendReceive(true);
  };

  const handleReceiveClick = () => {
    setSendReceiveMode('receive');
    setShowSendReceive(true);
  };

  return (
    <div className="min-h-screen bg-crypto-dark p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-crypto-gradient rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Solana Wallet</h1>
            <p className="text-gray-400 text-sm">Mainnet-beta</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="glass-card p-6 animate-fade-in">
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Total Balance</p>
          <div className="balance-text">{walletBalance.toFixed(2)} SOL</div>
          <p className="text-xl text-gray-300">${usdValue.toFixed(2)} USD</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <Button
            onClick={handleSendClick}
            className="flex-1 crypto-button text-white font-semibold py-3 rounded-xl"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button
            onClick={handleReceiveClick}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            Receive
          </Button>
          <Button
            onClick={() => setShowSwap(true)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Swap
          </Button>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-xl">
        {[
          { id: 'tokens', label: 'Tokens' },
          { id: 'nfts', label: 'NFTs' },
          { id: 'history', label: 'History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-crypto-gradient text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-slide-up">
        {activeTab === 'tokens' && <TokenList />}
        {activeTab === 'nfts' && <NFTGallery />}
        {activeTab === 'history' && <TransactionHistory />}
      </div>

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
  );
};

export default WalletDashboard;
