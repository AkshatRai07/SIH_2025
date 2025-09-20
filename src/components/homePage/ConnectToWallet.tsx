import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const ConnectToWallet = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-700 text-white px-4">
      {/* Logo / App Name */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
        RupeeChain
      </h1>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-lg animate-fadeIn">
        Seamless blockchain payments for India. Connect your wallet and explore the future of finance.
      </p>

      {/* Wallet Connect Button */}
      <div>
        <ConnectButton.Custom>
          {({ openConnectModal, mounted }) => {
            return (
              <button
                onClick={openConnectModal}
                disabled={!mounted}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg transform transition hover:scale-105 active:scale-95 font-semibold text-lg"
              >
                Connect Wallet
              </button>
            );
          }}
        </ConnectButton.Custom>
      </div>

      {/* Futuristic subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500 opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default ConnectToWallet
