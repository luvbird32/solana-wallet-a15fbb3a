
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, ArrowUp, ArrowDown, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  token: string;
  toFrom: string;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal = ({ transaction, isOpen, onClose }: TransactionDetailsModalProps) => {
  const { toast } = useToast();

  if (!transaction) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed': 
        return {
          color: 'text-success bg-success/10 border-success/30',
          icon: <CheckCircle className="w-5 h-5" />,
          text: 'Confirmed'
        };
      case 'pending': 
        return {
          color: 'text-warning bg-warning/10 border-warning/30',
          icon: <Clock className="w-5 h-5" />,
          text: 'Pending'
        };
      case 'failed': 
        return {
          color: 'text-error bg-error/10 border-error/30',
          icon: <XCircle className="w-5 h-5" />,
          text: 'Failed'
        };
      default: 
        return {
          color: 'text-muted-foreground bg-muted border-border',
          icon: <Clock className="w-5 h-5" />,
          text: 'Unknown'
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send': return <ArrowUp className="w-6 h-6 text-error" />;
      case 'receive': return <ArrowDown className="w-6 h-6 text-success" />;
      case 'swap': return <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>;
      default: return null;
    }
  };

  const mockTransactionHash = `${transaction.id}a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2`;
  const mockSignature = `${transaction.id}signature123abc456def789ghi`;
  const statusConfig = getStatusConfig(transaction.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div className="w-12 h-12 glass border border-white/30 rounded-2xl flex items-center justify-center">
              {getTypeIcon(transaction.type)}
            </div>
            <div className="text-left">
              <span className="capitalize">{transaction.type} Transaction</span>
              <DialogDescription className="mt-1">
                Transaction details and information
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Amount and Status */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-foreground">
                {transaction.type === 'send' ? '-' : '+'}{transaction.amount} {transaction.token}
              </p>
              <p className="text-lg text-muted-foreground">
                {transaction.timestamp.toLocaleString()}
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium border ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.text}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                {transaction.type === 'swap' ? 'Platform' : transaction.type === 'send' ? 'To' : 'From'}
              </label>
              <div className="flex items-center justify-between p-4 glass border border-white/30 rounded-2xl">
                <span className="font-mono text-sm text-foreground">{transaction.toFrom}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.toFrom, 'Address')}
                  className="h-8 w-8 p-0 hover:bg-white/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Transaction Hash</label>
              <div className="flex items-center justify-between p-4 glass border border-white/30 rounded-2xl">
                <span className="font-mono text-sm truncate text-foreground flex-1 mr-2">{mockTransactionHash}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mockTransactionHash, 'Transaction hash')}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://explorer.solana.com/tx/${mockTransactionHash}`, '_blank')}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {transaction.status === 'confirmed' && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">Signature</label>
                <div className="flex items-center justify-between p-4 glass border border-white/30 rounded-2xl">
                  <span className="font-mono text-sm truncate text-foreground flex-1 mr-2">{mockSignature}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mockSignature, 'Signature')}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full h-12 glass border border-white/40 hover:border-white/60 hover:bg-white/10"
              onClick={() => window.open(`https://explorer.solana.com/tx/${mockTransactionHash}`, '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              View on Solana Explorer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
