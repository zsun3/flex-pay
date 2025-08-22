const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentProcessor", () => {
  it("accepts payment and lets merchant withdraw", async () => {
    const [merchant, user] = await ethers.getSigners();
    const F = await ethers.getContractFactory("PaymentProcessor");
    const c = await F.deploy(merchant.address);

    const orderId = ethers.id("order-1");
    await c.connect(user).pay(orderId, { value: ethers.parseEther("0.01") });
    expect(await c.orderAmount(orderId)).to.eq(ethers.parseEther("0.01"));

    const before = await c.balances(merchant.address);
    await c.connect(merchant).withdraw(ethers.parseEther("0.006"));
    const after = await c.balances(merchant.address);
    expect(after).to.eq(before - ethers.parseEther("0.006"));
  });

  it("rejects duplicate orderId and non-merchant withdraw", async () => {
    const [merchant, user] = await ethers.getSigners();
    const F = await ethers.getContractFactory("PaymentProcessor");
    const c = await F.deploy(merchant.address);

    const oid = ethers.id("dup");
    await c.connect(user).pay(oid, { value: ethers.parseEther("0.001") });
    await expect(c.connect(user).pay(oid, { value: ethers.parseEther("0.001") }))
      .to.be.revertedWith("order exists");

    await expect(c.connect(user).withdraw(1)).to.be.revertedWith("not merchant");
  });
});