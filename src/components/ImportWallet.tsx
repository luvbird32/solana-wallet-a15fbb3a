
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { validateSeedPhrase, createWalletFromSeed, saveWalletToStorage } from '@/utils/walletUtils';
import { WalletAccount } from '@/types/wallet';
import { useToast } from '@/hooks/use-toast';

interface ImportWalletProps {
  onBack: () => void;
  onWalletImported: (wallet: WalletAccount) => void;
}

const ImportWallet = ({ onBack, onWalletImported }: ImportWalletProps) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletName, setWalletName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleImportWallet = async () => {
    if (!seedPhrase.trim()) {
      toast({
        title: "Error",
        description: "Please enter a recovery phrase",
        variant: "destructive",
      });
      return;
    }

    if (!walletName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a wallet name",
        variant: "destructive",
      });
      return;
    }

    const cleanSeedPhrase = seedPhrase.trim().toLowerCase();
    
    if (!validateSeedPhrase(cleanSeedPhrase)) {
      toast({
        title: "Error",
        description: "Invalid recovery phrase. Please check and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const keypair = createWalletFromSeed(cleanSeedPhrase);
      const wallet: WalletAccount = {
        id: Date.now().toString(),
        name: walletName.trim(),
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        seedPhrase: cleanSeedPhrase,
        createdAt: Date.now(),
      };

      saveWalletToStorage(wallet);
      onWalletImported(wallet);
      
      toast({
        title: "Success!",
        description: "Wallet imported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import wallet. Please check your recovery phrase.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Import Existing Wallet</h2>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl">Import Your Wallet</CardTitle>
          <p className="text-slate-600 text-sm">
            Enter your 12-word recovery phrase to import your existing wallet.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="import-seed">Recovery Phrase</Label>
            <textarea
              id="import-seed"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="Enter your 12-word recovery phrase separated by spaces..."
              className="w-full min-h-[120px] px-4 py-3 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="import-wallet-name">Wallet Name</Label>
            <Input
              id="import-wallet-name"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="e.g., Imported Wallet"
              className="py-3 rounded-xl"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 text-sm font-medium">
              💡 Your recovery phrase is encrypted and stored locally on your device.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImportWallet}
              disabled={isImporting}
              className="flex-1 wallet-button"
            >
              {isImporting ? 'Importing...' : 'Import Wallet'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportWallet;
