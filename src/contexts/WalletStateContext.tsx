
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface WalletState {
  activeTab: string;
  showSendReceive: boolean;
  showSwap: boolean;
  showWalletManagement: boolean;
  sendReceiveMode: 'send' | 'receive';
  selectedToken: any | null;
  showTokenDetails: boolean;
  loading: {
    tokens: boolean;
    transactions: boolean;
    balance: boolean;
  };
}

type WalletAction = 
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'TOGGLE_SEND_RECEIVE'; payload: { show: boolean; mode?: 'send' | 'receive' } }
  | { type: 'TOGGLE_SWAP'; payload: boolean }
  | { type: 'TOGGLE_WALLET_MANAGEMENT'; payload: boolean }
  | { type: 'SET_SELECTED_TOKEN'; payload: any | null }
  | { type: 'TOGGLE_TOKEN_DETAILS'; payload: boolean }
  | { type: 'SET_LOADING'; payload: { key: keyof WalletState['loading']; value: boolean } };

const initialState: WalletState = {
  activeTab: 'tokens',
  showSendReceive: false,
  showSwap: false,
  showWalletManagement: false,
  sendReceiveMode: 'send',
  selectedToken: null,
  showTokenDetails: false,
  loading: {
    tokens: false,
    transactions: false,
    balance: false,
  },
};

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_SEND_RECEIVE':
      return {
        ...state,
        showSendReceive: action.payload.show,
        sendReceiveMode: action.payload.mode || state.sendReceiveMode,
      };
    case 'TOGGLE_SWAP':
      return { ...state, showSwap: action.payload };
    case 'TOGGLE_WALLET_MANAGEMENT':
      return { ...state, showWalletManagement: action.payload };
    case 'SET_SELECTED_TOKEN':
      return { ...state, selectedToken: action.payload };
    case 'TOGGLE_TOKEN_DETAILS':
      return { ...state, showTokenDetails: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    default:
      return state;
  }
};

const WalletStateContext = createContext<{
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
} | null>(null);

export const WalletStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return (
    <WalletStateContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletStateContext.Provider>
  );
};

export const useWalletState = () => {
  const context = useContext(WalletStateContext);
  if (!context) {
    throw new Error('useWalletState must be used within WalletStateProvider');
  }
  return context;
};
