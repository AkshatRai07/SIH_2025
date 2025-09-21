'use client';

import { useEffect, useState } from 'react';
import HomePage from '../components/homePage/HomePage';
import { useEcosystem, Ecosystem } from '../hooks/useEcosystem';
import { useUniversalAccount } from '../hooks/useUniversalAccount';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const { isConnected } = useUniversalAccount();
  const { activeEcosystem, setActiveEcosystem } = useEcosystem();
  const { openConnectModal } = useConnectModal();
  const { setVisible: setSolanaModalVisible } = useWalletModal();
  const [connectIntent, setConnectIntent] = useState<Ecosystem | null>(null);

  const [isBusy, setIsBusy] = useState(false);

  const handleConnect = (ecosystem: Ecosystem) => {
    if (isBusy) return; // Ignore if busy.
    setIsBusy(true);
    setConnectIntent(ecosystem);
    setActiveEcosystem(ecosystem);
  };

  useEffect(() => {
    console.log(connectIntent, activeEcosystem)
    if (!connectIntent || !activeEcosystem) return;

    // --- STAGE 1: CONTEXT SWITCHING ---
    // If the user's intent doesn't match the active ecosystem,
    // our only job is to switch it and then stop.
    // The effect will run again after the app re-renders with the correct context.
    if (connectIntent !== activeEcosystem) {
      setActiveEcosystem(connectIntent);
      return; // Stop and wait for the re-render.
    }

    // --- STAGE 2: MODAL OPENING ---
    // If we've reached this point, it means connectIntent === activeEcosystem.
    // The context is correct, so we can now safely open the modal.

    if (connectIntent === 'EVM' && openConnectModal) {
      openConnectModal();
      setConnectIntent(null); // Reset intent after a successful action.
      setIsBusy(false);
    }

    if (connectIntent === 'SVM' && setSolanaModalVisible) {
      setSolanaModalVisible(true);
      setConnectIntent(null); // Reset intent after a successful action.
      setIsBusy(false);
    }
  }, [activeEcosystem, connectIntent, openConnectModal, setSolanaModalVisible]);

  if (isConnected) {
    return <HomePage />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-700 text-white px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
        RupeeChain
      </h1>

      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-lg animate-fadeIn">
        Seamless blockchain payments for India. Connect your wallet and explore the future of finance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={() => handleConnect('EVM')}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg transform transition hover:scale-[1.05] active:scale-[1] font-semibold text-lg"
        >
          Connect EVM Wallet
        </button>

        <button
          onClick={() => handleConnect('SVM')}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg transform transition hover:scale-105 active:scale-100 font-semibold text-lg"
        >
          Connect Solana Wallet
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500 opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
