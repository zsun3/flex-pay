// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const Hello = await hre.ethers.getContractFactory("Hello"); // contract name from Hello.sol
  const hello = await Hello.deploy();                       // deploys the contract
  await hello.waitForDeployment();                                     // waits for it to be mined

  const address = await hello.getAddress();
  console.log("Hello contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});