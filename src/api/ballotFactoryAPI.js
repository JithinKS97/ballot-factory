import { ethers } from "ethers";
import ballotFactoryArtifact from "../solidity/artifacts/contracts/BallotFactory.sol/BallotFactory.json";
import config from "../../config";
const ballotFactoryAbi = ballotFactoryArtifact["abi"];

export class BallotFactoryAPI {
  constructor() {
    if (typeof window === "undefined") {
      return;
    }
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.ballotFactoryContract = new ethers.Contract(
      config.contractAddress,
      ballotFactoryAbi,
      this.provider
    );
  }

  getBallots = async () => {
    try {
      const res = await this.ballotFactoryContract.getBallots();
      return res;
    } catch (err) {
      console.log("Unable to fetch ballots");
    }
  };

  createBallot = async (proposalList, title) => {
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
  };
}
