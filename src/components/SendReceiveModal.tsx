
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
    console.log('Address copied to clipboard');
  };

  const handleSend = () => {
    console.log('Sending:', { amount, recipient, token: selectedToken });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="glass border border-white/30 p-8 w-full max-w-md shadow-2xl rounded-3xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 glass border border-white/30 rounded-2xl flex items-center justify-center shadow-lg">
              {mode === 'send' ? (
                <ArrowUp className="w-8 h-8 text-primary" />
              ) : (
                <ArrowDown className="w-8 h-8 text-primary" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-foreground capitalize">{mode} Crypto</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-xl glass border border-white/20 hover:border-white/40 p-2 rounded-xl"
          >
            ✕
          </Button>
        </div>

        {mode === 'send' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-foreground mb-3">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="py-4 rounded-xl glass border border-white/30 focus:border-white/50 text-base"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-foreground mb-3">
                Amount
              </label>
              <div className="flex space-x-3">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="py-4 rounded-xl glass border border-white/30 focus:border-white/50 text-base"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="glass border border-white/30 rounded-xl px-4 py-4 text-foreground font-semibold backdrop-blur-xl focus:border-white/50 focus:outline-none"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleSend}
              className="w-full py-4 text-lg rounded-xl glass border border-white/40 hover:border-white/60 bg-primary/90 hover:bg-primary text-primary-foreground font-semibold shadow-xl"
              disabled={!amount || !recipient}
            >
              Send {selectedToken}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-56 h-56 glass border border-white/30 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl">
                <QrCode className="w-40 h-40 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Scan this QR code or copy the address below
              </p>
            </div>

            <div>
              <label className="block text-base font-semibold text-foreground mb-3">
                Your Wallet Address
              </label>
              <div className="flex space-x-3">
                <Input
                  value={walletAddress}
                  readOnly
                  className="glass border border-white/30 py-4 rounded-xl text-foreground font-mono text-sm backdrop-blur-xl"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="px-4 py-4 rounded-xl glass border border-white/30 hover:border-white/50 hover:bg-white/10"
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
