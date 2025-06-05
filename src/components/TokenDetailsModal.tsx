
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg flex-shrink-0">
              {token.icon}
            </div>
            <div className="text-left min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">{token.symbol}</h2>
              <DialogDescription className="text-sm mt-1 truncate">
                {token.name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="p-5">
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-foreground break-words">
                  {token.balance.toFixed(2)} {token.symbol}
                </p>
                <p className="text-xl text-muted-foreground">
                  ${token.usdValue.toFixed(2)}
                </p>
                <div className={`flex items-center justify-center space-x-2 ${
                  token.change24h >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="font-semibold">
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
                <div className="space-y-2">
                  <p className="font-semibold text-foreground text-sm">Token Address</p>
                  <div className="flex items-center space-x-2 bg-white/70 border border-white/60 rounded-xl p-3">
                    <p className="font-mono text-xs text-muted-foreground flex-1 min-w-0 truncate">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-7 w-7 p-0 hover:bg-white/80 flex-shrink-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 h-16 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200 text-xs"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-4 h-4" />
              <span className="font-medium">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 h-16 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200 text-xs"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span className="font-medium">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 h-16 bg-white/50 border border-white/50 hover:border-primary/50 hover:bg-white/70 transition-all duration-200 text-xs"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="font-medium">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
