import PayWidget from '../components/PayWidget';
import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Basic Payments</h1>
      <PayWidget />
      <Link href="/">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          ⬅ Back to Home
        </button>
      </Link>
    </main>
  );
}
