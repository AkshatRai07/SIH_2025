'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// This is the shape of the data we want to share universally
interface UniversalAccountState {
  isConnected: boolean;
  address: string | undefined;
}

// Create a new context specifically for sharing this universal state
const UniversalAccountContext = createContext<UniversalAccountState | undefined>(undefined);

// Create the provider component
export function UniversalAccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<UniversalAccountState>({
    isConnected: false,
    address: undefined,
  });

  // This special context provider will also pass down the 'setAccount' function
  // so our helper component can update the state.
  return (
    <UniversalAccountContext.Provider value={account}>
      <UniversalAccountSetContext.Provider value={setAccount}>
        {children}
      </UniversalAccountSetContext.Provider>
    </UniversalAccountContext.Provider>
  );
}

// This is the hook your UI components will use to GET the universal state
export function useUniversalAccount() {
  const context = useContext(UniversalAccountContext);
  if (context === undefined) {
    throw new Error('useUniversalAccount must be used within a UniversalAccountProvider');
  }
  return context;
}

// --- Helper context for setting the state ---
// We keep this separate so UI components can't accidentally change the state.
type SetUniversalAccount = (account: UniversalAccountState) => void;
const UniversalAccountSetContext = createContext<SetUniversalAccount | undefined>(undefined);

// This is the hook our SYNC component will use to SET the universal state
export function useSetUniversalAccount() {
  const context = useContext(UniversalAccountSetContext);
  if (context === undefined) {
    throw new Error('useSetUniversalAccount must be used within a UniversalAccountProvider');
  }
  return context;
}
