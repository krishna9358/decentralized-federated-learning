'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();
  const { disconnect } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = sessionStorage.getItem('walletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    } else {
      router.push('/login'); // Redirect to login if wallet address is not found
    }
  }, [router]);

  const handleLogout = async () => {
    await disconnect();
    sessionStorage.removeItem('walletAddress');
    router.push('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToPinata = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setLoading(true);
    try {
      const fileData = new FormData();
      fileData.append('file', file);

      const response = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          'Authorization' : `Bearer ${process.env.PINATA_JWT}`,
          'Content-Type': 'multipart/form-data',
        },
        
      });
      // console.log('Pinata API Key:', typeof process.env.NEXT_PUBLIC_PINATA_API_KEY);
      // console.log('Pinata Secret API Key:', typeof process.env.NEXT_PUBLIC_PINATA_API_KEY);


      const fileUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      setCid(fileUrl);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {walletAddress ? (
        <>
          <p>Welcome! You are logged in with wallet: {walletAddress}</p>
          <button onClick={handleLogout} className="logout-button">
            LOGOUT
          </button>
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

      <div>
        <h1>Upload a File to IPFS via Pinata</h1>
        <form>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadToPinata} disabled={loading}>
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>

        {cid && (
          <div>
            <p>File uploaded successfully!</p>
            <p>
              CID: <a href={cid} target="_blank" rel="noopener noreferrer">{cid}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
