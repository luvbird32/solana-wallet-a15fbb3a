
import React from 'react';
import { Wallet, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
              <Wallet className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-3 h-3 text-warning-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-foreground">
              Solana Wallet
            </h1>
            <p className="text-muted-foreground text-sm">
              Secure • Simple • Powerful
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-card-foreground">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
          
          {children}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Protected by enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
