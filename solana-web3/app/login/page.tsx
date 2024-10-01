// app/login/page.tsx
'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toString());

      // Store the wallet address in session storage
      sessionStorage.setItem('walletAddress', publicKey.toString());

      // Redirect to dashboard after connecting
      router.push('/dashboard');
    }
  }, [connected, publicKey]);

  return (
    <div>
      <h1>Solana Web3 Multi-Wallet Authentication</h1>
      <WalletMultiButton /> {/* This button allows users to select any wallet */}
      {walletAddress && <p>Connected as: {walletAddress}</p>}
    </div>
  );
}
