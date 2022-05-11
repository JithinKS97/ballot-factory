import { ethers } from "ethers";
import ballotArtifact from "../solidity/artifacts/contracts/Ballot.sol/Ballot.json";

const ballotAbi = ballotArtifact["abi"];

export class BallotAPI {
  constructor(ballotAddress) {
    if (typeof window === "undefined") {
      return;
    }
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.ballotContract = new ethers.Contract(
      ballotAddress,
      ballotAbi,
      this.provider
    );
  }

  getTitle = async () => {
    return await this.ballotContract.getTitle();
  };

  getProposals = async () => {
    return await this.ballotContract.getProposals();
  };

  getMyVote = async () => {
    const signer = this.provider.getSigner();
    return await this.ballotContract.connect(signer).getMyVote();
  };

  vote = async (proposalIndex) => {
    const signer = this.provider.getSigner();
    const receipt = await this.ballotContract
      .connect(signer)
      .vote(proposalIndex);
    await receipt.wait();
  };
}
