const hre = require("hardhat");

async function main() {
  const BallotFactory = await hre.ethers.getContractFactory("BallotFactory");
  const ballotFactory = await BallotFactory.deploy();

  await ballotFactory.deployed();

  console.log("Ballot factory deployed to:", ballotFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
