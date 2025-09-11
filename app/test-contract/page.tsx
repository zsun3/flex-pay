// app/page.tsx or pages/index.tsx
import HelloMessage from '../components/HelloMessage';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Flex Pay Demo</h1>
      <HelloMessage />
      <Link href="/">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          ⬅ Back to Home
        </button>
      </Link>
    </main>
  );
}
