// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "openzeppelin-solidity/contracts/token/erc20/erc20.sol";

contract MyToken is ERC20{ 

    address payable public owner;

    event EXCHANGE_ETH_TO_SCC(address requester, uint256 value);
    event EXCHANGE_SCC_TO_ETH(address requester, uint256 value);

    constructor(string memory name, string memory symbol) ERC20(name,symbol){
         // mint 1000 token 
         owner = payable(msg.sender);
         _mint(owner, 1000*10**uint(decimals())); 
         
        } 

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function ethToSSC() public payable returns (bool){
        // user send ETH && owner send SSC
        _transfer(owner, msg.sender, msg.value);
        emit EXCHANGE_ETH_TO_SCC(msg.sender, msg.value);
        return true;
    }


    function SSCtoEth(uint256 value) public payable returns (bool){
        // user send SSC && owner send ETH
        address payable user = payable(msg.sender);
        require(transfer(owner, value) == true);
        user.transfer(value);
        emit EXCHANGE_SCC_TO_ETH(user, value);

        return true;
    }

    function useSSC(uint256 value) public payable returns (bool) {
        require(transfer(owner, value) == true);
        //address payable user = payable(msg.sender);
        
        return true;
    }
}