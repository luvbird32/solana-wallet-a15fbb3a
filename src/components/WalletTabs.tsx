
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
    <div className="flex space-x-2 bg-surface/80 backdrop-blur-sm p-2 rounded-3xl border border-border shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-4 px-8 rounded-2xl font-semibold transition-all duration-300 text-lg relative group ${
            activeTab === tab.id
              ? 'bg-white text-primary shadow-lg shadow-primary/10 border border-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default WalletTabs;
