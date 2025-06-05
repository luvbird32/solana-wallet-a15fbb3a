
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TokenImportGuide = () => {
  return (
    <>
      <Card className="border border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900">Available Tokens</h3>
            <p className="text-sm text-blue-800 mb-3">Try searching for these popular tokens:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div>• USDC or USD Coin</div>
              <div>• RAY or Raydium</div>
              <div>• WSOL or Wrapped SOL</div>
              <div>• Or enter any mint address</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900">Important Notes</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Only import tokens from trusted sources</li>
              <li>• Verify the token address before importing</li>
              <li>• Scam tokens may have similar names to legitimate tokens</li>
              <li>• Always double-check the official token address</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TokenImportGuide;
