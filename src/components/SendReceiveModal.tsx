
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              {mode === 'send' ? (
                <ArrowUp className="w-7 h-7 text-primary" />
              ) : (
                <ArrowDown className="w-7 h-7 text-primary" />
              )}
            </div>
            <div className="text-left min-w-0">
              <h2 className="text-xl font-bold text-foreground capitalize">{mode} Crypto</h2>
              <DialogDescription className="text-sm mt-1">
                {mode === 'send' ? 'Send cryptocurrency to another wallet' : 'Receive cryptocurrency from others'}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {mode === 'send' ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="h-11 rounded-xl bg-white/50 border border-white/50 focus:border-primary/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Amount
              </label>
              <div className="flex space-x-2">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="h-11 rounded-xl bg-white/50 border border-white/50 focus:border-primary/50 text-sm flex-1"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="h-11 bg-white/50 border border-white/50 rounded-xl px-3 text-foreground font-semibold backdrop-blur-sm focus:border-primary/50 focus:outline-none w-20 text-sm"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleSend}
                className="w-full h-11 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg transition-all duration-200"
                disabled={!amount || !recipient}
              >
                Send {selectedToken}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-40 h-40 bg-white/50 border border-white/50 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code or copy the address below
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Your Wallet Address
              </label>
              <div className="flex space-x-2">
                <Input
                  value={walletAddress}
                  readOnly
                  className="bg-white/50 border border-white/50 h-11 rounded-xl text-foreground font-mono text-xs backdrop-blur-sm flex-1"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="h-11 px-3 rounded-xl bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
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
