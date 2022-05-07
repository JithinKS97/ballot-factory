import { ethers } from "ethers";
import ballotFactoryArtifact from "../solidity/artifacts/contracts/BallotFactory.sol/BallotFactory.json";

const ballotFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ballotFactoryAbi = ballotFactoryArtifact["abi"];

export class BallotFactoryAPI {
  constructor() {
    if (typeof window === "undefined") {
      return;
    }
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.ballotFactoryContract = new ethers.Contract(
      ballotFactoryAddress,
      ballotFactoryAbi,
      this.provider
    );
  }

  async getBallots() {
    try {
      const res = await this.ballotFactoryContract.getBallots();
      return res;
    } catch (err) {
      console.log("Unable to fetch ballots");
    }
  }

  async createBallot(proposalList, title) {
    try {
      const signer = this.provider.getSigner();
      const receipt = await this.ballotFactoryContract
        .connect(signer)
        .createBallot(proposalList, title);
      await receipt.wait();
      alert("Submitted ballot");
    } catch (err) {
      console.log("Unable to create ballot");
    }
  }
}
