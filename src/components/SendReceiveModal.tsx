
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, Copy, QrCode, Wallet, Zap } from 'lucide-react';
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
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6 space-y-4">
          <DialogTitle className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl animate-float text-white ${
                mode === 'send' 
                  ? 'bg-red-500' 
                  : 'bg-emerald-500'
              }`}>
                {mode === 'send' ? (
                  <ArrowUp className="w-8 h-8" />
                ) : (
                  <ArrowDown className="w-8 h-8" />
                )}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-slate-800 capitalize">
                {mode} Crypto
              </h2>
              <DialogDescription className="text-base mt-1 text-slate-600 font-medium">
                {mode === 'send' ? 'Send cryptocurrency to another wallet' : 'Receive cryptocurrency from others'}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {mode === 'send' ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                Recipient Address
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="h-12 rounded-2xl bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 text-sm font-medium shadow-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                Amount
              </label>
              <div className="flex gap-3">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="h-12 rounded-2xl bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 text-sm font-medium shadow-sm flex-1"
                />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="h-12 bg-white/80 border border-slate-200 rounded-2xl px-4 text-slate-700 font-bold shadow-sm focus:border-blue-400 focus:ring-blue-400/20 focus:outline-none w-24 text-sm"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="RAY">RAY</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSend}
                className="w-full h-12 text-base rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={!amount || !recipient}
              >
                <Wallet className="w-5 h-5 mr-2" />
                Send {selectedToken}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="relative mx-auto">
                <div className="w-48 h-48 bg-emerald-50 border-2 border-emerald-200 rounded-3xl mx-auto flex items-center justify-center shadow-xl">
                  <QrCode className="w-32 h-32 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-slate-700">
                  Scan QR Code
                </p>
                <p className="text-sm text-slate-600 font-medium">
                  Or copy the address below to receive payments
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                Your Wallet Address
              </label>
              <div className="flex gap-3">
                <Input
                  value={walletAddress}
                  readOnly
                  className="bg-white/80 border border-slate-200 h-12 rounded-2xl text-slate-700 font-mono text-sm shadow-sm flex-1"
                />
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  className="h-12 px-4 rounded-2xl bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
                >
                  <Copy className="w-5 h-5 text-emerald-600" />
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
