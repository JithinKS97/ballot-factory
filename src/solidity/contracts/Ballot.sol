//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Ballot {
    string public title;
    struct Proposal {
        string name;
    }
    Proposal[] public proposalList;
    address admin;

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
            proposalList.push(Proposal({name: _proposalList[i]}));
        }
        title = _title;
    }

    function getTitle() public view returns (string memory) {
        return title;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}
