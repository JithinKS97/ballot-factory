import { ethers } from "ethers";
import ballotArtifact from "../solidity/artifacts/contracts/Ballot.sol/Ballot.json";

const ballotAbi = ballotArtifact["abi"];

export class BallotAPI {
  constructor(ballotAddress) {
    if (typeof window === "undefined") {
      return;
    }
    this.initialized = true;
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.ballotContract = new ethers.Contract(
      ballotAddress,
      ballotAbi,
      this.provider
    );
  }

  async getTitle() {
    return await this.ballotContract.getTitle();
  }

  async getProposals() {
    return await this.ballotContract.getProposals();
  }

  async getMyVote() {
    return await this.ballotContract.getMyVote();
  }

  async vote(proposalIndex) {
    const signer = this.provider.getSigner();
    await this.ballotContract.connect(signer).vote(proposalIndex);
  }
}
