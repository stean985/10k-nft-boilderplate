import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
      }
    };

    initProvider();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        const account = accounts[0];
        console.log(account);
        setAccount(account);
        setSigner(signer);
        return { success: true, account};
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: false, error: 'No provider available' };
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
  };

  console.log("Wallet Connected", account)

  const value = {
    account,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}