
/**
 * @fileoverview Component for displaying token information with import functionality
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TokenInfo } from '@/types/token';

/**
 * Props for the TokenInfoDisplay component
 */
interface TokenInfoDisplayProps {
  /** Token information to display */
  tokenInfo: TokenInfo;
  /** Callback function when import button is clicked */
  onImport: () => void;
}

/**
 * Displays detailed token information in a card format with import capability
 * @param {TokenInfoDisplayProps} props - Component props
 * @returns {JSX.Element} TokenInfoDisplay component
 */
const TokenInfoDisplay = ({ tokenInfo, onImport }: TokenInfoDisplayProps) => {
  return (
    <Card className="border border-slate-200 bg-slate-50">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Token Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Symbol</p>
              <p className="font-medium text-slate-900">{tokenInfo.symbol}</p>
            </div>
            <div>
              <p className="text-slate-500">Name</p>
              <p className="font-medium text-slate-900">{tokenInfo.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Decimals</p>
              <p className="font-medium text-slate-900">{tokenInfo.decimals}</p>
            </div>
            <div>
              <p className="text-slate-500">Address</p>
              <p className="font-mono text-xs text-slate-900 break-all">
                {tokenInfo.address.slice(0, 8)}...{tokenInfo.address.slice(-8)}
              </p>
            </div>
          </div>
          <Button
            onClick={onImport}
            className="w-full wallet-button mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Import Token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInfoDisplay;
