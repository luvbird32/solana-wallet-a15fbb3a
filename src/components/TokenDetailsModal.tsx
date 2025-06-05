
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Send, ArrowDownToLine, ArrowUpDown, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  address?: string;
}

interface TokenDetailsModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: 'send' | 'receive' | 'swap', token: Token) => void;
}

const TokenDetailsModal = ({ token, isOpen, onClose, onAction }: TokenDetailsModalProps) => {
  const { toast } = useToast();

  if (!token) return null;

  const copyAddress = () => {
    if (token.address) {
      navigator.clipboard.writeText(token.address);
      toast({
        title: "Address Copied",
        description: "Token address copied to clipboard",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass border border-white/40">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-6">
            <div className="w-20 h-20 glass border border-white/40 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-xl">
              {token.icon}
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-foreground">{token.symbol}</h2>
              <DialogDescription className="text-lg mt-1">
                {token.name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Balance Card */}
          <Card className="glass border border-white/40">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <p className="text-5xl font-bold text-foreground">
                  {token.balance.toFixed(2)} {token.symbol}
                </p>
                <p className="text-3xl text-muted-foreground">
                  ${token.usdValue.toFixed(2)}
                </p>
                <div className={`flex items-center justify-center space-x-3 ${
                  token.change24h >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-6 h-6" />
                  ) : (
                    <TrendingDown className="w-6 h-6" />
                  )}
                  <span className="font-semibold text-xl">
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Address */}
          {token.address && (
            <Card className="glass border border-white/40">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="font-semibold text-foreground text-lg">Token Address</p>
                  <div className="flex items-center justify-between glass border border-white/30 rounded-2xl p-4">
                    <p className="font-mono text-sm text-muted-foreground">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-8 w-8 p-0 hover:bg-white/20">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-3 h-24 glass border border-white/40 hover:border-white/60 hover:bg-white/20 transition-all duration-200"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-7 h-7" />
              <span className="text-sm font-semibold">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-3 h-24 glass border border-white/40 hover:border-white/60 hover:bg-white/20 transition-all duration-200"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-7 h-7" />
              <span className="text-sm font-semibold">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-3 h-24 glass border border-white/40 hover:border-white/60 hover:bg-white/20 transition-all duration-200"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-7 h-7" />
              <span className="text-sm font-semibold">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
