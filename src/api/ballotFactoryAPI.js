import { ethers } from "ethers";
import ballotFactoryArtifact from "../solidity/artifacts/contracts/BallotFactory.sol/BallotFactory.json";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const ballotFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ballotFactoryAbi = ballotFactoryArtifact["abi"];

const signer = provider.getSigner();

const ballotFactoryContract = new ethers.Contract(
  ballotFactoryAddress,
  ballotFactoryAbi,
  provider
);

export const getAllBallots = async () => {
  const res = await ballotFactoryContract.getBallots();
  console.log(res);
};
