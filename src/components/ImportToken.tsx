
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TokenSearchForm from './TokenSearchForm';
import TokenInfoDisplay from './TokenInfoDisplay';
import TokenImportGuide from './TokenImportGuide';
import { saveTokenToStorage } from '@/utils/tokenUtils';
import { TokenInfo } from '@/types/token';

interface ImportTokenProps {
  onBack: () => void;
  onTokenImported: (token: any) => void;
}

const ImportToken = ({ onBack, onTokenImported }: ImportTokenProps) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleTokenFound = async (token: TokenInfo | null) => {
    setLoading(true);
    setError('');
    
    if (token) {
      setTokenInfo(token);
    } else {
      setError('Token not found');
    }
    
    setLoading(false);
  };

  const handleImportToken = () => {
    if (!tokenInfo) return;

    const success = saveTokenToStorage(tokenInfo);
    
    if (!success) {
      toast({
        title: "Token Already Added",
        description: "This token is already in your wallet",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Token Imported",
      description: `${tokenInfo.symbol} has been added to your wallet`,
    });

    onTokenImported(tokenInfo);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Import Token</h2>
      </div>

      <TokenSearchForm
        onTokenFound={handleTokenFound}
        loading={loading}
        error={error}
      />

      {tokenInfo && (
        <TokenInfoDisplay
          tokenInfo={tokenInfo}
          onImport={handleImportToken}
        />
      )}

      <TokenImportGuide />
    </div>
  );
};

export default ImportToken;
