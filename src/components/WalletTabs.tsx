
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
    <div className="bg-white/80 backdrop-blur-lg border border-slate-200 p-2 rounded-3xl shadow-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-5 px-8 rounded-2xl font-bold transition-all duration-300 text-lg relative group ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-lg transform scale-[1.02]'
              : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/80'
          }`}
        >
          <span className="flex items-center justify-center gap-3">
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`text-xs px-3 py-1.5 rounded-full font-bold border-2 transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white border-white/30 shadow-lg' 
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute inset-x-2 bottom-1 h-1 bg-white/50 rounded-full shadow-sm"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default WalletTabs;
