
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send': return <ArrowUp className="w-5 h-5 text-red-500" />;
      case 'receive': return <ArrowDown className="w-5 h-5 text-green-500" />;
      case 'swap': return <div className="w-5 h-5 bg-blue-500 rounded-full" />;
      default: return null;
    }
  };

  const mockTransactionHash = `${transaction.id}a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2`;
  const mockSignature = `${transaction.id}signature123abc456def789ghi`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getTypeIcon(transaction.type)}
            <span className="capitalize">{transaction.type} Transaction</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount and Status */}
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-slate-900">
              {transaction.type === 'send' ? '-' : '+'}{transaction.amount} {transaction.token}
            </p>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                {transaction.type === 'swap' ? 'Platform' : transaction.type === 'send' ? 'To' : 'From'}
              </label>
              <div className="flex items-center justify-between mt-1 p-3 bg-slate-50 rounded-lg">
                <span className="font-mono text-sm">{transaction.toFrom}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.toFrom, 'Address')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Transaction Hash</label>
              <div className="flex items-center justify-between mt-1 p-3 bg-slate-50 rounded-lg">
                <span className="font-mono text-sm truncate">{mockTransactionHash}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mockTransactionHash, 'Transaction hash')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://explorer.solana.com/tx/${mockTransactionHash}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Timestamp</label>
              <p className="mt-1 p-3 bg-slate-50 rounded-lg text-sm">
                {transaction.timestamp.toLocaleString()}
              </p>
            </div>

            {transaction.status === 'confirmed' && (
              <div>
                <label className="text-sm font-medium text-slate-600">Signature</label>
                <div className="flex items-center justify-between mt-1 p-3 bg-slate-50 rounded-lg">
                  <span className="font-mono text-sm truncate">{mockSignature}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mockSignature, 'Signature')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`https://explorer.solana.com/tx/${mockTransactionHash}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
