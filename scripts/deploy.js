// scripts/deploy.js

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Hello contract
  const Hello = await hre.ethers.getContractFactory("Hello"); // contract name from Hello.sol
  const hello = await Hello.deploy();                       // deploys the contract
  await hello.waitForDeployment();                                     // waits for it to be mined

  const helloAddress = await hello.getAddress();
  console.log("Hello contract deployed to:", helloAddress);

  // Transaction Contract
  // use your first signer as the merchant
  const [merchant] = await ethers.getSigners();

  const Factory = await ethers.getContractFactory("PaymentProcessor");
  const pp = await Factory.deploy(merchant.address);
  await pp.waitForDeployment();

  const paymentAddress = await pp.getAddress();
  console.log("PaymentProcessor deployed to:", paymentAddress);
  console.log("Merchant (withdrawer):", merchant.address);

  // Path to your .env file at project root
  const envPath = path.join(__dirname, "..", ".env");

  // Update .env file
  let envFile = "";
  if (fs.existsSync(envPath)) {
    envFile = fs.readFileSync(envPath, "utf8");
  }

  // Update Hello contract address
  const newLineHello = `NEXT_PUBLIC_HELLO_ADDRESS=${helloAddress}`;
  if (/^NEXT_PUBLIC_HELLO_ADDRESS=.*/m.test(envFile)) {
    envFile = envFile.replace(/^NEXT_PUBLIC_HELLO_ADDRESS=.*/m, newLineHello);
  } else {
    envFile += (envFile.endsWith("\n") ? "" : "\n") + newLineHello + "\n";
  }

  // Update Payment contract address
  const newLinePayment = `NEXT_PUBLIC_PAYMENTS_ADDRESS=${paymentAddress}`;
  if (/^NEXT_PUBLIC_PAYMENTS_ADDRESS=.*/m.test(envFile)) {
    envFile = envFile.replace(/^NEXT_PUBLIC_PAYMENTS_ADDRESS=.*/m, newLinePayment);
  } else {
    envFile += (envFile.endsWith("\n") ? "" : "\n") + newLinePayment + "\n";
  }

  fs.writeFileSync(envPath, envFile);
  console.log(`.env updated with NEXT_PUBLIC_PAYMENTS_ADDRESS=${paymentAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});