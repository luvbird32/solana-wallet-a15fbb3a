
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { mockPrograms, solanaContract, ContractCall } from '@/utils/solanaPrograms';
import { PublicKey } from '@solana/web3.js';
import ContractList from './ContractList';
import ContractParameters from './ContractParameters';

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

        <ContractParameters
          contract={selectedContract}
          accounts={accounts}
          loading={loading}
          connected={connected}
          onAccountChange={handleAccountChange}
          onExecuteContract={executeContract}
          lastTransaction={lastTransaction}
        />
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

      <ContractList
        contracts={mockPrograms}
        connected={connected}
        onSelectContract={initializeAccounts}
      />

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
