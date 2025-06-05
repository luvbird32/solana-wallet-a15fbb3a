
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  token: string;
  toFrom: string;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
}

const TransactionHistory = () => {
  // Mock transaction data - in real app this would come from Solana transaction history
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'receive',
      amount: 5.25,
      token: 'SOL',
      toFrom: '8k7s...9m2n',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'send',
      amount: 100.0,
      token: 'USDC',
      toFrom: '3h8f...7k1p',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'confirmed'
    },
    {
      id: '3',
      type: 'swap',
      amount: 50.0,
      token: 'RAY',
      toFrom: 'Jupiter',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: 'confirmed'
    },
    {
      id: '4',
      type: 'send',
      amount: 2.5,
      token: 'SOL',
      toFrom: '9j2k...8h5m',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'pending'
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send': return <ArrowUp className="w-4 h-4 text-red-400" />;
      case 'receive': return <ArrowDown className="w-4 h-4 text-emerald-400" />;
      case 'swap': return <div className="w-4 h-4 bg-cyan-400 rounded-full" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <Card key={tx.id} className="glass-card p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                {getTypeIcon(tx.type)}
              </div>
              <div>
                <h3 className="font-semibold text-white capitalize">{tx.type}</h3>
                <p className="text-gray-400 text-sm">
                  {tx.type === 'swap' ? tx.toFrom : `${tx.type === 'send' ? 'To' : 'From'} ${tx.toFrom}`}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-white">
                {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
              </p>
              <p className="text-gray-400 text-sm">{formatTime(tx.timestamp)}</p>
              <p className={`text-sm font-medium capitalize ${getStatusColor(tx.status)}`}>
                {tx.status}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TransactionHistory;
