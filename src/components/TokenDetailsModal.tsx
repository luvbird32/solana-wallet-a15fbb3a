
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
              {token.icon}
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-foreground">{token.symbol}</h2>
              <DialogDescription className="text-base mt-1">
                {token.name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
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
            <Card className="bg-white/50 border border-white/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Token Address</p>
                  <div className="flex items-center justify-between bg-white/70 border border-white/60 rounded-xl p-3">
                    <p className="font-mono text-sm text-muted-foreground">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-8 w-8 p-0 hover:bg-white/80">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-5 h-5" />
              <span className="text-sm font-medium">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span className="text-sm font-medium">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-5 h-5" />
              <span className="text-sm font-medium">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
