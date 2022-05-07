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

  async getTitle() {
    return await this.ballotContract.getTitle();
  }
}
