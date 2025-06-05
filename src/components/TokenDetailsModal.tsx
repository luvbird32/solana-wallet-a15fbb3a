
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              {token.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold">{token.symbol}</h2>
              <p className="text-sm text-slate-500">{token.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Balance Card */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-slate-900">
                  {token.balance.toFixed(2)} {token.symbol}
                </p>
                <p className="text-xl text-slate-600">
                  ${token.usdValue.toFixed(2)}
                </p>
                <div className={`flex items-center justify-center space-x-1 ${
                  token.change24h >= 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Address */}
          {token.address && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Token Address</p>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <p className="font-mono text-sm text-slate-600">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
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
              className="flex flex-col items-center space-y-1 h-16"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-5 h-5" />
              <span className="text-xs">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 h-16"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span className="text-xs">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 h-16"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-5 h-5" />
              <span className="text-xs">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
