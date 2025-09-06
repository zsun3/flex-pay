// components/NavigateButton.tsx (Client Component)
"use client";

import { useRouter } from "next/navigation";

export default function PayButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/pay")}
      className="p-2 bg-blue-600 text-white"
    >
      Go to Payment
    </button>
  );
}