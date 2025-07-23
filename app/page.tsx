export default async function Page() {

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">

        {/* Headline */}
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to Flex Pay
        </h1>

        {/* Description */}
        <p className="text-lg max-w-xl text-center text-gray-300">
          We are a decentralized Web3 organization focused on reimagining the future of lending.  
          Flex Pay makes peer-to-peer loans faster, fairer, and trustless through smart contracts and DeFi protocols.
        </p>
      </main>
    </div>
  )
}