
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { WalletStateProvider } from '@/contexts/WalletStateContext';

/**
 * All-in-one providers wrapper for testing components
 */
export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WalletStateProvider>
          {children}
        </WalletStateProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
