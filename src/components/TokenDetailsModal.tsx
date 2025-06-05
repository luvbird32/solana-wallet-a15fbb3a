
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="max-w-md glass border border-white/30">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-16 h-16 glass border border-white/30 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
              {token.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{token.symbol}</h2>
              <p className="text-muted-foreground">{token.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Balance Card */}
          <Card className="glass border border-white/30">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <p className="text-4xl font-bold text-foreground">
                  {token.balance.toFixed(2)} {token.symbol}
                </p>
                <p className="text-2xl text-muted-foreground">
                  ${token.usdValue.toFixed(2)}
                </p>
                <div className={`flex items-center justify-center space-x-2 ${
                  token.change24h >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className="font-semibold text-lg">
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Address */}
          {token.address && (
            <Card className="glass border border-white/30">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Token Address</p>
                  <div className="flex items-center justify-between glass border border-white/20 rounded-xl p-4">
                    <p className="font-mono text-sm text-muted-foreground">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="hover:bg-white/10">
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
              className="flex flex-col items-center space-y-2 h-20 glass border border-white/30 hover:border-white/50 hover:bg-white/10"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-6 h-6" />
              <span className="text-sm font-medium">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20 glass border border-white/30 hover:border-white/50 hover:bg-white/10"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-6 h-6" />
              <span className="text-sm font-medium">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20 glass border border-white/30 hover:border-white/50 hover:bg-white/10"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-6 h-6" />
              <span className="text-sm font-medium">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
