
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { generateSeedPhrase, createWalletFromSeed, saveWalletToStorage } from '@/utils/walletUtils';
import { WalletAccount } from '@/types/wallet';
import { useToast } from '@/hooks/use-toast';

interface CreateWalletProps {
  onBack: () => void;
  onWalletCreated: (wallet: WalletAccount) => void;
}

const CreateWallet = ({ onBack, onWalletCreated }: CreateWalletProps) => {
  const [step, setStep] = useState<'generate' | 'confirm' | 'name'>('generate');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [confirmSeedPhrase, setConfirmSeedPhrase] = useState('');
  const [walletName, setWalletName] = useState('');
  const [showSeed, setShowSeed] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSeed = () => {
    const newSeedPhrase = generateSeedPhrase();
    setSeedPhrase(newSeedPhrase);
  };

  const copySeedPhrase = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase);
      toast({
        title: "Copied!",
        description: "Seed phrase copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy seed phrase",
        variant: "destructive",
      });
    }
  };

  const handleConfirmSeed = () => {
    if (confirmSeedPhrase.trim() === seedPhrase.trim()) {
      setStep('name');
    } else {
      toast({
        title: "Error",
        description: "Seed phrase doesn't match. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateWallet = async () => {
    if (!walletName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a wallet name",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const keypair = createWalletFromSeed(seedPhrase);
      const wallet: WalletAccount = {
        id: Date.now().toString(),
        name: walletName.trim(),
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        seedPhrase: seedPhrase,
        createdAt: Date.now(),
      };

      saveWalletToStorage(wallet);
      onWalletCreated(wallet);
      
      toast({
        title: "Success!",
        description: "Wallet created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create wallet",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  React.useEffect(() => {
    if (step === 'generate' && !seedPhrase) {
      handleGenerateSeed();
    }
  }, [step, seedPhrase]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Create New Wallet</h2>
      </div>

      {step === 'generate' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Your Secret Recovery Phrase</CardTitle>
            <p className="text-slate-600 text-sm">
              Save this phrase in a safe place. You'll need it to recover your wallet.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">Recovery Phrase</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSeed(!showSeed)}
                  >
                    {showSeed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copySeedPhrase}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateSeed}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {seedPhrase.split(' ').map((word, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-lg p-3 text-center"
                  >
                    <span className="text-xs text-slate-500">{index + 1}</span>
                    <div className="font-mono text-sm">
                      {showSeed ? word : '••••'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-orange-800 text-sm font-medium">
                ⚠️ Never share your recovery phrase with anyone. Store it securely offline.
              </p>
            </div>
            <Button
              onClick={() => setStep('confirm')}
              className="w-full wallet-button py-3"
            >
              I've Saved My Recovery Phrase
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'confirm' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Confirm Recovery Phrase</CardTitle>
            <p className="text-slate-600 text-sm">
              Please enter your recovery phrase to confirm you've saved it correctly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="confirm-seed">Recovery Phrase</Label>
              <textarea
                id="confirm-seed"
                value={confirmSeedPhrase}
                onChange={(e) => setConfirmSeedPhrase(e.target.value)}
                placeholder="Enter your 12-word recovery phrase..."
                className="w-full min-h-[120px] px-4 py-3 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep('generate')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirmSeed}
                className="flex-1 wallet-button"
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'name' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Name Your Wallet</CardTitle>
            <p className="text-slate-600 text-sm">
              Give your wallet a name to easily identify it.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wallet-name">Wallet Name</Label>
              <Input
                id="wallet-name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="e.g., My Main Wallet"
                className="py-3 rounded-xl"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep('confirm')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateWallet}
                disabled={isCreating}
                className="flex-1 wallet-button"
              >
                {isCreating ? 'Creating...' : 'Create Wallet'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateWallet;
