//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Ballot.sol";

contract BallotFactory {
    Ballot[] public ballots;

    function createBallot(string[] memory _proposalList, string memory _title)
        public
    {
        ballots.push(new Ballot(_proposalList, _title));
    }

    struct BallotDetail {
        string title;
        address _address;
    }

    function getBallots()
        public
        view
        returns (BallotDetail[] memory ballotDetails)
    {
        BallotDetail[] memory ballotDetailsList = new BallotDetail[](
            ballots.length
        );
        for (uint256 i = 0; i < ballots.length; i++) {
            ballotDetailsList[i] = BallotDetail({
                title: ballots[i].getTitle(),
                _address: ballots[i].getAddress()
            });
        }
        return ballotDetailsList;
    }
}
