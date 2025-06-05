
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SmartContractHeaderProps {
  title: string;
  onBack: () => void;
}

const SmartContractHeader = ({ title, onBack }: SmartContractHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" onClick={onBack} className="p-2">
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
  );
};

export default SmartContractHeader;
