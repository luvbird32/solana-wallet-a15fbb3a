
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUp, ArrowDown, Repeat } from 'lucide-react';
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
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-glow">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Solana Wallet</h1>
            <p className="text-purple-300 text-sm font-medium">Mainnet-beta</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="glass-card p-8 animate-fade-in border-purple-500/20">
        <div className="text-center space-y-4">
          <p className="text-gray-300 text-sm uppercase tracking-wider font-medium">Total Balance</p>
          <div className="balance-text animate-float">{walletBalance.toFixed(2)} SOL</div>
          <p className="text-2xl text-gray-200 font-semibold">${usdValue.toFixed(2)} USD</p>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Button
            onClick={handleSendClick}
            className="wallet-button text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
          >
            <ArrowUp className="w-5 h-5" />
            <span>Send</span>
          </Button>
          <Button
            onClick={handleReceiveClick}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ArrowDown className="w-5 h-5" />
            <span>Receive</span>
          </Button>
          <Button
            onClick={() => setShowSwap(true)}
            className="secondary-button text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
          >
            <Repeat className="w-5 h-5" />
            <span>Swap</span>
          </Button>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white/5 p-2 rounded-2xl backdrop-blur-lg border border-white/10">
        {[
          { id: 'tokens', label: 'Tokens' },
          { id: 'nfts', label: 'NFTs' },
          { id: 'history', label: 'History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
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
