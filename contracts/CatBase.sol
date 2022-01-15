// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./MyToken.sol";

contract CatBase is MyToken{

    event NewCat(string name, uint32 kittyId);
    event FeedCat(address feeder, uint32 beforeId, uint32 afterId);
    
    uint private randNonce = 0;
    uint private coolDownTime = 1 minutes;
    uint32 private catCounts = 0;
    uint32[] private kittyIds = [0, 150593, 232751, 404726, 462704, 493816];
    uint256[] private kittyPrices = [0, 1, 2, 3, 4, 5];

    struct Cat {
        string name;
        uint256 price;
        uint256 coolDown;
        uint32 kittyId; //cryptokitty id
    }

    mapping(uint32 => uint16) internal idToIndex;
    mapping(address => uint32) internal ownerToCat; // in-contract id;
    Cat[] internal cats;

    constructor(string memory name, string memory symbol) MyToken(name, symbol){

        for(uint16 i=1;i<=5;i++){
            idToIndex[kittyIds[i]] = i;
        }

        cats.push(Cat("ERROR", 0, block.timestamp, 0));
    }

    function _makeRandom() internal returns(uint16){
        return uint16(uint(keccak256(abi.encodePacked(block.timestamp, randNonce++, msg.sender))) % 5) + 1;
    }

    function _getMyCatIdx() internal view returns(uint32) {return ownerToCat[msg.sender];}


    function registerCat() public {

        if(ownerToCat[msg.sender] == 0){
            uint16 random = _makeRandom();
            cats.push(Cat("test", kittyPrices[random], block.timestamp, kittyIds[random]));
            ownerToCat[msg.sender] = ++catCounts;
            emit NewCat("test", kittyIds[random]);
        }
        
    }

    function getCatCounts() public view returns(uint32) { return catCounts; }

    function getMyCat() public view returns(Cat memory mycat){
        require(ownerToCat[msg.sender] != 0, "register first");
        mycat = cats[ownerToCat[msg.sender]];
    }

    function hasCat() public view returns(bool){
         return _getMyCatIdx() > 0;
    }


    function updateKittyId(uint16 _to) internal returns(uint32 beforeId, uint32 afterId){
        beforeId = _getMyCatIdx();
        afterId = _to;
        Cat storage cat = cats[beforeId];
        cat.kittyId = kittyIds[afterId];
    }

    function feed() public{
        uint32 beforeId;
        uint32 afterId;
        (beforeId, afterId) = updateKittyId(_makeRandom());
        emit FeedCat(msg.sender, beforeId, afterId);
    }

    

}