
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shadow-lg">
              {mode === 'send' ? (
                <ArrowUp className="w-8 h-8 text-primary" />
              ) : (
                <ArrowDown className="w-8 h-8 text-primary" />
              )}
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-foreground capitalize">{mode} Crypto</h2>
              <DialogDescription className="text-base mt-1">
                {mode === 'send' ? 'Send cryptocurrency to another wallet' : 'Receive cryptocurrency from others'}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

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
                className="h-12 rounded-xl bg-white/50 border border-white/50 focus:border-primary/50 text-base"
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
                  className="h-12 rounded-xl bg-white/50 border border-white/50 focus:border-primary/50 text-base"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="h-12 bg-white/50 border border-white/50 rounded-xl px-4 text-foreground font-semibold backdrop-blur-sm focus:border-primary/50 focus:outline-none min-w-[100px]"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleSend}
              className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg transition-all duration-200"
              disabled={!amount || !recipient}
            >
              Send {selectedToken}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-white/50 border border-white/50 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <QrCode className="w-32 h-32 text-muted-foreground" />
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
                  className="bg-white/50 border border-white/50 h-12 rounded-xl text-foreground font-mono text-sm backdrop-blur-sm"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="h-12 px-4 rounded-xl bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70"
                >
                  <Copy className="w-5 h-5" />
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
