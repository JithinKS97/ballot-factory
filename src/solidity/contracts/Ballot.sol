//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Ballot {
    string public title;
    struct Proposal {
        string name;
        uint256 voteCount;
    }
    struct Voter {
        bool voted;
        uint256 vote;
    }
    Proposal[] public proposalList;
    address admin;
    mapping(address => Voter) public voters;

    constructor(string[] memory _proposalList, string memory _title) {
        require(
            _proposalList.length > 1,
            "No of proposals should be greater than 1"
        );
        require(
            keccak256(abi.encodePacked(_title)) !=
                keccak256(abi.encodePacked("")),
            "Title should not be empty"
        );
        for (uint256 i = 0; i < _proposalList.length; i++) {
            proposalList.push(Proposal({name: _proposalList[i], voteCount: 0}));
        }
        title = _title;
    }

    function vote(uint256 proposalIndex) public {
        require(!voters[msg.sender].voted, "Already voted");
        proposalList[proposalIndex].voteCount++;
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = proposalIndex;
    }

    function getTitle() public view returns (string memory) {
        return title;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposalList;
    }

    function getMyVote() public view returns (Voter memory) {
        return voters[msg.sender];
    }
}
