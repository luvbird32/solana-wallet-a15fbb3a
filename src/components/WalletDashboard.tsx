
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUp, ArrowDown, Repeat, TrendingUp } from 'lucide-react';
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
  const change24h = 5.23;

  const handleSendClick = () => {
    setSendReceiveMode('send');
    setShowSendReceive(true);
  };

  const handleReceiveClick = () => {
    setSendReceiveMode('receive');
    setShowSendReceive(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Solana Wallet</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-blue-600 text-sm font-medium">Mainnet Connected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="p-10 border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Total Portfolio Value</p>
              <div className="balance-text">{walletBalance.toFixed(2)} SOL</div>
              <div className="flex items-center justify-center space-x-3">
                <p className="text-3xl text-slate-600 font-bold">${usdValue.toFixed(2)}</p>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  change24h >= 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${change24h < 0 ? 'rotate-180' : ''}`} />
                  <span>{change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <Button
              onClick={handleSendClick}
              className="wallet-button py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg"
            >
              <ArrowUp className="w-6 h-6" />
              <span>Send</span>
            </Button>
            <Button
              onClick={handleReceiveClick}
              className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg"
            >
              <ArrowDown className="w-6 h-6" />
              <span>Receive</span>
            </Button>
            <Button
              onClick={() => setShowSwap(true)}
              className="secondary-button py-6 rounded-2xl flex items-center justify-center space-x-3 text-lg"
            >
              <Repeat className="w-6 h-6" />
              <span>Swap</span>
            </Button>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {[
            { id: 'tokens', label: 'Tokens' },
            { id: 'nfts', label: 'NFTs' },
            { id: 'history', label: 'History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-8 rounded-xl font-semibold transition-all duration-200 text-lg ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
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
    </div>
  );
};

export default WalletDashboard;
