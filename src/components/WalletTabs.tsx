
import React from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface WalletTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'tokens', label: 'Tokens', count: 3 },
  { id: 'nfts', label: 'NFTs', count: 12 },
  { id: 'history', label: 'History' }
];

const WalletTabs = ({ activeTab, onTabChange }: WalletTabsProps) => {
  return (
    <div className="flex space-x-2 glass border border-white/30 p-2 rounded-3xl shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-4 px-8 rounded-2xl font-semibold transition-all duration-300 text-lg relative group ${
            activeTab === tab.id
              ? 'glass border border-white/40 text-primary shadow-lg'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/20'
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`text-xs px-2 py-1 rounded-full font-bold border ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-primary border-white/30' 
                  : 'bg-white/10 text-muted-foreground border-white/20'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default WalletTabs;
