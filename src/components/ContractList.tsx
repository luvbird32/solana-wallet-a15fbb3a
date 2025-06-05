
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import { ContractCall } from '@/utils/solanaPrograms';

interface ContractListProps {
  contracts: ContractCall[];
  connected: boolean;
  onSelectContract: (contract: ContractCall) => void;
}

const ContractList = ({ contracts, connected, onSelectContract }: ContractListProps) => {
  return (
    <div className="grid gap-6">
      {contracts.map((contract) => (
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
                  onClick={() => onSelectContract(contract)}
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
  );
};

export default ContractList;
