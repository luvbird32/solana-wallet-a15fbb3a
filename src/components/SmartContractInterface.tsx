
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { mockPrograms, solanaContract, ContractCall } from '@/utils/solanaPrograms';
import { PublicKey } from '@solana/web3.js';
import SmartContractHeader from './SmartContractHeader';
import SmartContractExecution from './SmartContractExecution';
import ContractList from './ContractList';

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
      const mockSignTransaction = async (tx: any) => {
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
      <SmartContractExecution
        contract={selectedContract}
        accounts={accounts}
        loading={loading}
        onBack={() => setSelectedContract(null)}
        onAccountChange={handleAccountChange}
        onExecuteContract={executeContract}
        lastTransaction={lastTransaction}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SmartContractHeader title="Smart Contracts" onBack={onBack} />

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
