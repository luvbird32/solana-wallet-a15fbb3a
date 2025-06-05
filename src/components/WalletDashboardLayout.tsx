
import React from 'react';

interface WalletDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const WalletDashboardLayout = ({ children, className = "" }: WalletDashboardLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-surface to-surface-alt p-4 md:p-8 ${className}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  );
};

export default WalletDashboardLayout;
