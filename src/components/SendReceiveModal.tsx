
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
      <Card className="bg-white p-8 w-full max-w-md animate-fade-in shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              {mode === 'send' ? (
                <ArrowUp className="w-6 h-6 text-white" />
              ) : (
                <ArrowDown className="w-6 h-6 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{mode} Crypto</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </Button>
        </div>

        {mode === 'send' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="py-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amount
              </label>
              <div className="flex space-x-3">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="py-3 rounded-xl"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleSend}
              className="w-full wallet-button py-4 text-lg rounded-xl"
              disabled={!amount || !recipient}
            >
              Send {selectedToken}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-slate-200">
                <QrCode className="w-32 h-32 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg mb-4">
                Scan this QR code or copy the address below
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Wallet Address
              </label>
              <div className="flex space-x-3">
                <Input
                  value={walletAddress}
                  readOnly
                  className="bg-slate-50 py-3 rounded-xl text-slate-700 font-mono text-sm"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="px-4 py-3 rounded-xl"
                >
                  <Copy className="w-5 h-5" />
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
