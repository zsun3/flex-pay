// components/HelloMessage.tsx
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import HelloABI from '../../constants/Hello.json';
import { HELLO_CONTRACT_ADDRESS } from "../../constants/Hello";

export default function HelloMessage() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    const fetchMessage = async () => {
      if (!window.ethereum) return console.warn("MetaMask not found");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(HELLO_CONTRACT_ADDRESS, HelloABI.abi, signer);

      try {
        const msg = await contract.getMessage();
        setMessage(msg);
      } catch (err) {
        console.error("Failed to fetch message:", err);
        setMessage("Error");
      }
    };

    fetchMessage();
  }, []);

  return <div className="text-lg">📬 Blockchain message: {message}</div>;
}