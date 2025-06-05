
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Import, Wallet, Trash2, Copy, ArrowLeft } from 'lucide-react';
import { getWalletsFromStorage, removeWalletFromStorage, formatAddress, WalletAccount } from '@/utils/walletUtils';
import { useToast } from '@/hooks/use-toast';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

interface WalletManagementProps {
  onBack: () => void;
}

const WalletManagement = ({ onBack }: WalletManagementProps) => {
  const [view, setView] = useState<'list' | 'create' | 'import'>('list');
  const [wallets, setWallets] = useState<WalletAccount[]>([]);
  const { toast } = useToast();

  const loadWallets = () => {
    const storedWallets = getWalletsFromStorage();
    setWallets(storedWallets);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const handleDeleteWallet = (walletId: string) => {
    if (confirm('Are you sure you want to delete this wallet? This action cannot be undone.')) {
      removeWalletFromStorage(walletId);
      loadWallets();
      toast({
        title: "Wallet Deleted",
        description: "Wallet has been removed successfully",
      });
    }
  };

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy address",
        variant: "destructive",
      });
    }
  };

  const handleWalletCreated = (wallet: WalletAccount) => {
    loadWallets();
    setView('list');
  };

  const handleWalletImported = (wallet: WalletAccount) => {
    loadWallets();
    setView('list');
  };

  if (view === 'create') {
    return (
      <CreateWallet
        onBack={() => setView('list')}
        onWalletCreated={handleWalletCreated}
      />
    );
  }

  if (view === 'import') {
    return (
      <ImportWallet
        onBack={() => setView('list')}
        onWalletImported={handleWalletImported}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-slate-900">Wallet Management</h2>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setView('create')}
            className="wallet-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Wallet
          </Button>
          <Button
            onClick={() => setView('import')}
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Import className="w-4 h-4 mr-2" />
            Import Wallet
          </Button>
        </div>
      </div>

      {wallets.length === 0 ? (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl p-12 text-center">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Wallets Found</h3>
              <p className="text-slate-600 text-lg">Create a new wallet or import an existing one to get started</p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setView('create')}
                className="wallet-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Wallet
              </Button>
              <Button
                onClick={() => setView('import')}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Import className="w-4 h-4 mr-2" />
                Import Wallet
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{wallet.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 font-mono">
                          {formatAddress(wallet.publicKey)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyAddress(wallet.publicKey)}
                          className="p-1 h-auto"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Created {new Date(wallet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletManagement;
