'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSetUniversalAccount } from '../../hooks/useUniversalAccount';

// This component ONLY contains EVM hooks.
export function EvmStateSync() {
  const setUniversalAccount = useSetUniversalAccount();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    setUniversalAccount({ isConnected, address });
  }, [isConnected, address, setUniversalAccount]);

  return null; // Renders no UI
}

// This component ONLY contains Solana hooks.
export function SolanaStateSync() {
  const setUniversalAccount = useSetUniversalAccount();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    setUniversalAccount({
      isConnected: connected,
      address: publicKey?.toBase58(),
    });
  }, [connected, publicKey, setUniversalAccount]);

  return null; // Renders no UI
}
