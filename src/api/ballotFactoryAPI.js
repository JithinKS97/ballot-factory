import { ethers } from "ethers";
import ballotFactoryArtifact from "../solidity/artifacts/contracts/BallotFactory.sol/BallotFactory.json";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const ballotFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ballotFactoryAbi = ballotFactoryArtifact["abi"];

const ballotFactoryContract = new ethers.Contract(
  ballotFactoryAddress,
  ballotFactoryAbi,
  provider
);

export const connect = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
};

export const isConnected = async () => {
  return window.ethereum.isConnected();
};

export const getBallots = async () => {
  const res = await ballotFactoryContract.getBallots();
  console.log(res);
};

export const createBallot = async (proposalList, title) => {
  console.log(proposalList, title);
  const signer = provider.getSigner();
  const res = await ballotFactoryContract
    .connect(signer)
    .createBallot(proposalList, title);
  console.log(res);
};
