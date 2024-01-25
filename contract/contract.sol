// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

contract InvestStartup {
    mapping(address => uint256) public investment1;
    mapping(address => uint256) public investment2;
    mapping(address => uint256) public totalShare;

    function firstInvestment(uint256 newNum) public {
        investment1[msg.sender] = newNum;
    }

    function secondInvestment(uint256 newNum) public {
        investment2[msg.sender] = newNum;
    }

    function sumInvestments() public {
        totalShare[msg.sender] = investment1[msg.sender] + investment2[msg.sender];
    }

    function getTotalShares(address user) public view returns (uint256) {
        return totalShare[user];
    }
}
