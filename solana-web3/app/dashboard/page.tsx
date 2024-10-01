// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();
  const { disconnect } = useWallet();

  useEffect(() => {
    const storedAddress = sessionStorage.getItem('walletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    } else {
      // Redirect to login if not logged in
      router.push('/login');
    }
  }, []);

  const handleLogout = async () => {
    // Disconnect the wallet
    await disconnect();
    // Clear the wallet address from session storage
    sessionStorage.removeItem('walletAddress');
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {walletAddress ? (
        <>
        <p>Welcome! You are logged in with wallet: {walletAddress}</p>
        <button onClick={handleLogout}>LOGOUT</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}

<style jsx>{`
        .logout-button {
          background-color: #ff5c5c;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }

        .logout-button:hover {
          background-color: #ff3c3c;
        }
      `}</style>
      
    </div>
  );
}
