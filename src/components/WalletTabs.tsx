
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface WalletTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'nfts', label: 'NFTs' },
  { id: 'history', label: 'History' },
  { id: 'contracts', label: 'Contracts' }
];

const WalletTabs = ({ activeTab, onTabChange }: WalletTabsProps) => {
  return (
    <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-4 px-8 rounded-xl font-semibold transition-all duration-200 text-lg ${
            activeTab === tab.id
              ? 'bg-white text-blue-600 shadow-md border border-blue-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default WalletTabs;
