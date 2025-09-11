'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { PAYMENTS_ABI, PAYMENTS_ADDRESS } from '@/constants/Payments';

export default function PayWidget() {
  const [addr, setAddr] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  async function connect() {
    const { ethereum } = window as any;
    if (!ethereum) return alert('Install MetaMask');
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(ethereum);
    const net = await provider.getNetwork();
    if (Number(net.chainId) !== 31337) {
      throw new Error(
        `Wrong network: ${Number(net.chainId)}. Switch to 31337.`
      );
    }
    const signer = await provider.getSigner();
    setAddr(await signer.getAddress());
  }

  async function payEth() {
    setStatus('Sending…');
    try {
      const { ethereum } = window as any;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        PAYMENTS_ADDRESS,
        PAYMENTS_ABI,
        signer
      );

      // simple order id (deterministic enough for a demo)
      const orderId = ethers.id(`order:${Date.now()}:${Math.random()}`);

      const tx = await contract.pay(orderId, {
        value: ethers.parseEther('0.01'), // ← amount to pay
      });
      await tx.wait();
      setStatus('Paid 0.01 ETH ✅');
    } catch (e: any) {
      setStatus(`Error: ${e?.message || e}`);
    }
  }

  async function withdraw() {
    setStatus('Withdrawing…');
    try {
      const { ethereum } = window as any;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        PAYMENTS_ADDRESS,
        PAYMENTS_ABI,
        signer
      );

      const tx = await contract.withdraw(ethers.parseEther('0.01'));
      await tx.wait();
      setStatus('Withdrawn 0.01 ETH ✅');
    } catch (e: any) {
      setStatus(`Error: ${e?.message || e}`);
    }
  }

  useEffect(() => {
    // optional auto-connect on load
    connect().catch(() => {});
    (window as any).ethers = ethers; // 👈 now ethers is global
  }, []);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div>Connected: {addr || '—'}</div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={connect}
      >
        Connect
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={payEth}
      >
        Pay 0.01 ETH
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={withdraw}
      >
        Withdraw 0.01 ETH (merchant only)
      </button>
      <div>{status}</div>
    </div>
  );
}
