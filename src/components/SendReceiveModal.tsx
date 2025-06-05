
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, Copy, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SendReceiveModalProps {
  mode: 'send' | 'receive';
  isOpen: boolean;
  onClose: () => void;
}

const SendReceiveModal = ({ mode, isOpen, onClose }: SendReceiveModalProps) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState('SOL');
  const { toast } = useToast();

  // Mock wallet address
  const walletAddress = 'DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleSend = () => {
    console.log('Sending:', { amount, recipient, token: selectedToken });
    toast({
      title: "Transaction Initiated",
      description: `Sending ${amount} ${selectedToken} to ${recipient.slice(0, 8)}...`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass border border-white/40">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-6">
            <div className="w-20 h-20 glass border border-white/40 rounded-3xl flex items-center justify-center shadow-xl">
              {mode === 'send' ? (
                <ArrowUp className="w-10 h-10 text-primary" />
              ) : (
                <ArrowDown className="w-10 h-10 text-primary" />
              )}
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-foreground capitalize">{mode} Crypto</h2>
              <DialogDescription className="text-lg mt-1">
                {mode === 'send' ? 'Send cryptocurrency to another wallet' : 'Receive cryptocurrency from others'}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {mode === 'send' ? (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="h-14 rounded-2xl glass border border-white/40 focus:border-white/60 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Amount
              </label>
              <div className="flex space-x-4">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="h-14 rounded-2xl glass border border-white/40 focus:border-white/60 text-lg"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="h-14 glass border border-white/40 rounded-2xl px-6 text-foreground font-semibold backdrop-blur-xl focus:border-white/60 focus:outline-none min-w-[100px]"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleSend}
              className="w-full h-14 text-xl rounded-2xl glass border border-white/50 hover:border-white/70 bg-primary/90 hover:bg-primary text-primary-foreground font-semibold shadow-xl transition-all duration-200"
              disabled={!amount || !recipient}
            >
              Send {selectedToken}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-64 h-64 glass border border-white/40 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl">
                <QrCode className="w-48 h-48 text-muted-foreground" />
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                Scan this QR code or copy the address below
              </p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Your Wallet Address
              </label>
              <div className="flex space-x-4">
                <Input
                  value={walletAddress}
                  readOnly
                  className="glass border border-white/40 h-14 rounded-2xl text-foreground font-mono text-sm backdrop-blur-xl"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="h-14 px-6 rounded-2xl glass border border-white/40 hover:border-white/60 hover:bg-white/20"
                >
                  <Copy className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SendReceiveModal;
