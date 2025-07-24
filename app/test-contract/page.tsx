// app/page.tsx or pages/index.tsx
import HelloMessage from "../components/HelloMessage";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Flex Pay Demo</h1>
      <HelloMessage />
    </main>
  );
}