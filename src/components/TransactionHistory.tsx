
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import TransactionDetailsModal from './TransactionDetailsModal';
import { Transaction } from '@/types/transaction';
import { useTransactionFormatting } from '@/hooks/useTransactionFormatting';
import { SIZES } from '@/constants/ui';

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { formatTime, getStatusColor, getTypeIcon, getTypeDescription } = useTransactionFormatting();

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

  const renderTypeIcon = (type: Transaction['type']) => {
    const IconComponent = getTypeIcon(type);
    if (IconComponent) {
      return <IconComponent className={`${SIZES.ICON_SM} ${type === 'send' ? 'text-red-500' : 'text-green-500'}`} />;
    }
    return <div className={`${SIZES.ICON_SM} bg-blue-500 rounded-full`} />;
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card 
            key={tx.id} 
            className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200 hover:border-slate-300"
            onClick={() => handleTransactionClick(tx)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  {renderTypeIcon(tx.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 capitalize text-lg">{tx.type}</h3>
                  <p className="text-slate-500 text-sm">
                    {getTypeDescription(tx)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-slate-900 text-lg">
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                </p>
                <p className="text-slate-500 text-sm">{formatTime(tx.timestamp)}</p>
                <p className={`text-sm font-medium capitalize ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TransactionHistory;
