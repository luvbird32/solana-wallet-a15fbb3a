
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { solanaContract, ContractCall } from '@/utils/solanaPrograms';
import { PublicKey } from '@solana/web3.js';
import SmartContractHeader from './SmartContractHeader';
import ContractParameters from './ContractParameters';

interface SmartContractExecutionProps {
  contract: ContractCall;
  accounts: string[];
  loading: boolean;
  onBack: () => void;
  onAccountChange: (index: number, value: string) => void;
  onExecuteContract: () => void;
  lastTransaction: string;
}

const SmartContractExecution = ({ 
  contract, 
  accounts, 
  loading, 
  onBack, 
  onAccountChange, 
  onExecuteContract,
  lastTransaction 
}: SmartContractExecutionProps) => {
  const { connected } = useWallet();

  return (
    <div className="space-y-6">
      <SmartContractHeader title={contract.name} onBack={onBack} />
      
      <ContractParameters
        contract={contract}
        accounts={accounts}
        loading={loading}
        connected={connected}
        onAccountChange={onAccountChange}
        onExecuteContract={onExecuteContract}
        lastTransaction={lastTransaction}
      />
    </div>
  );
};

export default SmartContractExecution;
