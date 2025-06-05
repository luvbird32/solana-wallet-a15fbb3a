
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, Zap, Shield } from 'lucide-react';

export const WalletConnectingLoader = () => (
  <Card className="p-8 text-center border-blue-200 bg-blue-50">
    <div className="space-y-4">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
        <Wallet className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Connecting Wallet
        </h3>
        <p className="text-blue-700 text-sm">
          Please check your wallet extension and approve the connection request
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </Card>
);

export const TokensLoadingSkeleton = () => (
  <div className="space-y-4" role="status" aria-label="Loading tokens">
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-28" />
    </div>
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export const TransactionLoadingSkeleton = () => (
  <div className="space-y-4" role="status" aria-label="Loading transactions">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export const WalletOperationLoader = ({ operation }: { operation: string }) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{operation}</h3>
        <p className="text-slate-600 text-sm">Please wait while we process your request</p>
      </div>
    </div>
  </div>
);
