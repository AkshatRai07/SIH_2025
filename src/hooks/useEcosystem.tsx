'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Ecosystem = 'EVM' | 'SVM' ;

interface EcosystemContextValue {
  activeEcosystem: Ecosystem;
  setActiveEcosystem: (ecosystem: Ecosystem) => void;
}

const EcosystemContext = createContext<EcosystemContextValue | undefined>(undefined);

export function EcosystemProvider({ children }: { children: ReactNode }) {
  const [activeEcosystem, setActiveEcosystem] = useState<Ecosystem>('EVM');

  return (
    <EcosystemContext.Provider value={{ activeEcosystem, setActiveEcosystem }}>
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error('useEcosystem must be used within a EcosystemProvider');
  }
  return context;
}
