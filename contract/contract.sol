// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;




contract investStartup {
    uint256 public investment1;
    uint256 public investment2;

    mapping(address=>uint256) totalShare;
    
    constructor () {
        investment1 = 0;
        investment2 = 0;
    }

    function firstInvestment(uint256 newNum) public {
        investment1 = newNum;
    }
    
    function secondInvestment(uint256 newNum) public {
        investment2 = newNum;
    }
    
    function newTotal(address user) public view returns(uint256){
        return totalShare[user];
    }
    
    function sumInvestments(address user) public  returns (uint256) {
        return totalShare[user] = investment1 + investment2;
    }
}
