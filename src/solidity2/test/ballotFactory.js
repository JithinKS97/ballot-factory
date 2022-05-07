const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot factory", function () {
  it("tests the deployment of ballot factory", async function () {
    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.deployed();
  });

  it("tests the addition of a ballet", async function () {
    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.createBallot(["p1", "p2"], "t1");
    const res = await ballotFactory.getBallots();
    expect(res[0].title).to.equal("t1");
  });

  it("tests the addition of two ballet", async function () {
    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.createBallot(["p1", "p2"], "t1");
    await ballotFactory.createBallot(["p3", "p4"], "t2");
    const res = await ballotFactory.getBallots();
    expect(res[0].title).to.equal("t1");
    expect(res[1].title).to.equal("t2");
  });
});
