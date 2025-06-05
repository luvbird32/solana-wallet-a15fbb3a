
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Zap } from 'lucide-react';
import { ContractCall } from '@/utils/solanaPrograms';

interface ContractParametersProps {
  contract: ContractCall;
  accounts: string[];
  loading: boolean;
  connected: boolean;
  onAccountChange: (index: number, value: string) => void;
  onExecuteContract: () => void;
  lastTransaction: string;
}

const ContractParameters = ({
  contract,
  accounts,
  loading,
  connected,
  onAccountChange,
  onExecuteContract,
  lastTransaction
}: ContractParametersProps) => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Contract Parameters</span>
        </CardTitle>
        <p className="text-slate-600">{contract.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Program ID</p>
            <p className="font-mono text-xs text-slate-900 break-all">
              {contract.programId}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Method</p>
            <p className="font-medium text-slate-900">{contract.method}</p>
          </div>
          <div>
            <p className="text-slate-500">Estimated Fee</p>
            <p className="font-medium text-slate-900">{contract.estimatedFee} SOL</p>
          </div>
          <div>
            <p className="text-slate-500">Required Accounts</p>
            <p className="font-medium text-slate-900">{contract.requiredAccounts.length}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Account Addresses</h3>
          {contract.requiredAccounts.map((accountName, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`account-${index}`} className="text-slate-700 font-medium capitalize">
                {accountName} Account
              </Label>
              <Input
                id={`account-${index}`}
                value={accounts[index] || ''}
                onChange={(e) => onAccountChange(index, e.target.value)}
                placeholder={`Enter ${accountName} account address...`}
                className="border-slate-200 focus:border-blue-400 text-slate-900 font-mono text-sm"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={onExecuteContract}
          disabled={loading || !connected || accounts.some(acc => !acc.trim())}
          className="w-full wallet-button py-4 text-lg"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Executing Contract...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Execute Contract</span>
            </div>
          )}
        </Button>

        {lastTransaction && (
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-green-900">Transaction Successful</h3>
                <p className="text-sm text-green-800">Transaction Signature:</p>
                <p className="font-mono text-xs text-green-900 break-all">
                  {lastTransaction}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractParameters;
