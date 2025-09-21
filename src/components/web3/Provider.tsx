'use client';

import { useEcosystem } from '../../hooks/useEcosystem';
import { EvmProvider } from './EvmProvider';
import { SvmProvider } from './SvmProvider';
import { EvmStateSync, SolanaStateSync } from './EcosystemStateSync';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { activeEcosystem } = useEcosystem();

  if (activeEcosystem === 'EVM') {
    return (
      <EvmProvider>
        <EvmStateSync />
        {children}
      </EvmProvider>
    );
  }

  if (activeEcosystem === 'SVM') {
    return (
      <SvmProvider>
        <SolanaStateSync />
        {children}
      </SvmProvider>
    );
  }

  return <>{children}</>;
}
