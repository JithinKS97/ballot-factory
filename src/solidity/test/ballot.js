const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Ballot", function () {
  it("tests the voting in a ballot", async function () {
    const [, addr1] = await ethers.getSigners();

    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.deployed();
    await ballotFactory.createBallot(["p1", "p2"], "t1");
    const ballotAddress = await ballotFactory.ballots(0);

    const ballot = await await ethers.getContractAt("Ballot", ballotAddress);
    await ballot.connect(addr1).vote(0);
    const proposals = await ballot.getProposals();
    expect(proposals[0].voteCount.toString()).to.equal("1");
  });

  it("tests wallet who already voted is not allowed to vote again", async function () {
    const [, addr1] = await ethers.getSigners();

    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.deployed();
    await ballotFactory.createBallot(["p1", "p2"], "t1");
    const ballotAddress = await ballotFactory.ballots(0);

    const ballot = await await ethers.getContractAt("Ballot", ballotAddress);
    await ballot.connect(addr1).vote(1);
    expect(ballot.connect(addr1).vote(1)).to.be.revertedWith("Already voted");
  });

  it("tests vote is correctly marked against the voter", async function () {
    const [, addr1, addr2] = await ethers.getSigners();

    const BallotFactory = await ethers.getContractFactory("BallotFactory");
    const ballotFactory = await BallotFactory.deploy();
    await ballotFactory.deployed();

    await ballotFactory.createBallot(["p1", "p2", "p3"], "t1");
    const ballotAddress = await ballotFactory.ballots(0);

    const ballot = await await ethers.getContractAt("Ballot", ballotAddress);
    await ballot.connect(addr1).vote(2);

    let res = await ballot.connect(addr1).getMyVote();
    expect(res.voted).to.equal(true);
    expect(res.vote.toString()).to.equal("2");

    res = await ballot.connect(addr2).getMyVote();
    expect(res.voted).to.equal(false);
  });
});
