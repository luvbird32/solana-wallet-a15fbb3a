
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useRateLimit } from '@/hooks/useRateLimit';

const RateLimitStatus = () => {
  const { rateLimitStatus, isRateLimited } = useRateLimit();

  const operations = [
    { key: 'WALLET_CREATION', label: 'Wallet Creation', limit: '5/min' },
    { key: 'TOKEN_SEARCH', label: 'Token Search', limit: '100/min' },
    { key: 'BALANCE_CHECK', label: 'Balance Check', limit: '200/min' }
  ] as const;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>API Rate Limits</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {operations.map((op) => {
          const limited = isRateLimited(op.key);
          return (
            <div key={op.key} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                {limited ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                <span className="font-medium">{op.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">{op.limit}</span>
                <Badge variant={limited ? "destructive" : "secondary"}>
                  {limited ? 'Limited' : 'Available'}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RateLimitStatus;
