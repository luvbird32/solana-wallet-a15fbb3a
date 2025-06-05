
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Code, Settings, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { mockPrograms, solanaContract, ContractCall } from '@/utils/solanaPrograms';
import { PublicKey } from '@solana/web3.js';

interface SmartContractInterfaceProps {
  onBack: () => void;
}

const SmartContractInterface = ({ onBack }: SmartContractInterfaceProps) => {
  const [selectedContract, setSelectedContract] = useState<ContractCall | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<string>('');
  const { toast } = useToast();
  const { publicKey, connected } = useWallet();

  const handleAccountChange = (index: number, value: string) => {
    const newAccounts = [...accounts];
    newAccounts[index] = value;
    setAccounts(newAccounts);
  };

  const executeContract = async () => {
    if (!selectedContract || !connected || !publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to interact with smart contracts",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock transaction execution
      const mockSignTransaction = async (tx: any) => {
        // In real app, this would use the actual wallet adapter
        await new Promise(resolve => setTimeout(resolve, 2000));
        return tx;
      };

      const signature = await solanaContract.callProgram(
        {
          programId: selectedContract.programId,
          method: selectedContract.method,
          accounts: accounts
        },
        new PublicKey(publicKey),
        mockSignTransaction
      );

      setLastTransaction(signature);
      toast({
        title: "Transaction Successful",
        description: `Contract method ${selectedContract.method} executed successfully`,
      });
    } catch (error) {
      console.error('Contract execution failed:', error);
      toast({
        title: "Transaction Failed",
        description: "Failed to execute smart contract method",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeAccounts = (contract: ContractCall) => {
    setSelectedContract(contract);
    setAccounts(new Array(contract.requiredAccounts.length).fill(''));
  };

  if (selectedContract) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setSelectedContract(null)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-slate-900">{selectedContract.name}</h2>
        </div>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Contract Parameters</span>
            </CardTitle>
            <p className="text-slate-600">{selectedContract.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Program ID</p>
                <p className="font-mono text-xs text-slate-900 break-all">
                  {selectedContract.programId}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Method</p>
                <p className="font-medium text-slate-900">{selectedContract.method}</p>
              </div>
              <div>
                <p className="text-slate-500">Estimated Fee</p>
                <p className="font-medium text-slate-900">{selectedContract.estimatedFee} SOL</p>
              </div>
              <div>
                <p className="text-slate-500">Required Accounts</p>
                <p className="font-medium text-slate-900">{selectedContract.requiredAccounts.length}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Account Addresses</h3>
              {selectedContract.requiredAccounts.map((accountName, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`account-${index}`} className="text-slate-700 font-medium capitalize">
                    {accountName} Account
                  </Label>
                  <Input
                    id={`account-${index}`}
                    value={accounts[index] || ''}
                    onChange={(e) => handleAccountChange(index, e.target.value)}
                    placeholder={`Enter ${accountName} account address...`}
                    className="border-slate-200 focus:border-blue-400 text-slate-900 font-mono text-sm"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={executeContract}
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Smart Contracts</h2>
      </div>

      <div className="grid gap-6">
        {mockPrograms.map((contract) => (
          <Card key={contract.id} className="border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{contract.name}</h3>
                    <p className="text-slate-500 text-sm">{contract.description}</p>
                    <p className="text-slate-400 text-xs font-mono mt-1">
                      {contract.programId.slice(0, 8)}...{contract.programId.slice(-8)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-slate-500 text-sm">Estimated Fee</p>
                  <p className="font-bold text-slate-900">{contract.estimatedFee} SOL</p>
                  <Button
                    onClick={() => initializeAccounts(contract)}
                    className="mt-2 wallet-button"
                    disabled={!connected}
                  >
                    Interact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!connected && (
        <Card className="border border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-900">Wallet Required</h3>
              <p className="text-sm text-orange-800">
                Connect your Solana wallet to interact with smart contracts
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartContractInterface;
