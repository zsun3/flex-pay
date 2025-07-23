'use client';

import { useSession } from "@clerk/nextjs";

export default function DashboardPage() {
  const { session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your session ID: {session?.id}</p>
    </div>
  );
}