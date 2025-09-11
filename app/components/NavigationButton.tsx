// components/NavigateButton.tsx (Client Component)
"use client";

import { useRouter } from "next/navigation";

export default function NavigateButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/test-contract")}
      className="p-2 bg-blue-600 text-white"
    >
      Go to About
    </button>
  );
}