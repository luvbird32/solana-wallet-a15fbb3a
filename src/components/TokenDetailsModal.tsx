
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Send, ArrowDownToLine, ArrowUpDown, Copy, Sparkles } from 'lucide-react';
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
      <DialogContent className="max-w-md bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6 space-y-4">
          <DialogTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-2xl font-bold shadow-xl animate-float">
                {token.icon}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {token.symbol}
              </h2>
              <DialogDescription className="text-base mt-1 text-slate-600 font-medium">
                {token.name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enhanced Balance Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="space-y-1">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {token.balance.toFixed(2)}
                  </p>
                  <p className="text-lg font-semibold text-slate-600">{token.symbol}</p>
                </div>
                <p className="text-2xl font-bold text-slate-700">
                  ${token.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                  token.change24h >= 0 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Token Address */}
          {token.address && (
            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 shadow-md">
              <CardContent className="p-5">
                <div className="space-y-3">
                  <p className="font-bold text-slate-700 text-sm uppercase tracking-wide">Token Address</p>
                  <div className="flex items-center gap-3 bg-white/80 border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200">
                    <p className="font-mono text-sm text-slate-600 flex-1 min-w-0 truncate">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyAddress} 
                      className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-xl transition-all duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-20 bg-gradient-to-b from-white to-slate-50 border-slate-200 hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md group"
              onClick={() => onAction('send', token)}
            >
              <Send className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold text-slate-700 text-sm">Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-20 bg-gradient-to-b from-white to-slate-50 border-slate-200 hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md group"
              onClick={() => onAction('receive', token)}
            >
              <ArrowDownToLine className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold text-slate-700 text-sm">Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-20 bg-gradient-to-b from-white to-slate-50 border-slate-200 hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md group"
              onClick={() => onAction('swap', token)}
            >
              <ArrowUpDown className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold text-slate-700 text-sm">Swap</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
