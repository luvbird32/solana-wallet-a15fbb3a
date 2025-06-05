
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, Copy, QrCode } from 'lucide-react';

interface SendReceiveModalProps {
  mode: 'send' | 'receive';
  onClose: () => void;
}

const SendReceiveModal = ({ mode, onClose }: SendReceiveModalProps) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState('SOL');

  // Mock wallet address
  const walletAddress = 'DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    // In real app, show toast notification
    console.log('Address copied to clipboard');
  };

  const handleSend = () => {
    // In real app, this would initiate a Solana transaction
    console.log('Sending:', { amount, recipient, token: selectedToken });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="glass-card p-6 w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-crypto-gradient rounded-full flex items-center justify-center">
              {mode === 'send' ? (
                <ArrowUp className="w-5 h-5 text-white" />
              ) : (
                <ArrowDown className="w-5 h-5 text-white" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white capitalize">{mode} Crypto</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>

        {mode === 'send' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <div className="flex space-x-2">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleSend}
              className="w-full crypto-button text-white font-semibold py-3 rounded-xl"
              disabled={!amount || !recipient}
            >
              Send {selectedToken}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Scan this QR code or copy the address below
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Wallet Address
              </label>
              <div className="flex space-x-2">
                <Input
                  value={walletAddress}
                  readOnly
                  className="bg-white/10 border-white/20 text-white text-sm"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SendReceiveModal;
