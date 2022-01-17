// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./MyToken.sol";

contract CatBase is MyToken{

    event NewCat(string name, string kittyId);
    event FeedCat(address feeder, string beforeId, string afterId);
    
    uint private randNonce = 0;
    uint private coolDownTime = 1 minutes;
    uint32 private catCounts = 0;
    string[] private kittyIds = ["0", "150593.svg", "232751.svg", "404726.svg", "462704.svg", "493816.svg"];
    uint256[] private kittyPrices = [0, 1, 2, 3, 4, 5];

    struct Cat {
        string name;
        uint256 price;
        uint256 coolDown;
        string kittyId; //cryptokitty id
    }

    mapping(string => uint16) internal idToIndex;
    mapping(address => uint32) internal ownerToCat; // in-contract id;
    Cat[] internal cats;

    constructor(string memory name, string memory symbol) MyToken(name, symbol){

        for(uint16 i=1;i<=5;i++){
            idToIndex[kittyIds[i]] = i;
        }

        cats.push(Cat("ERROR", 0, block.timestamp, "0"));
    }

    function _makeRandom() internal returns(uint16){
        return uint16(uint(keccak256(abi.encodePacked(block.timestamp, randNonce++, msg.sender))) % 5) + 1;
    }

    function _getMyCatIdx() internal view returns(uint32) {return ownerToCat[msg.sender];}


    function registerCat(string memory catName) public {

        if(ownerToCat[msg.sender] == 0){
            uint16 random = _makeRandom();
            cats.push(Cat(catName, kittyPrices[random], block.timestamp, kittyIds[random]));
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


    function updateKittyId(uint16 _to) internal returns(string memory beforeId, string memory afterId){

        Cat storage cat = cats[_getMyCatIdx()];
        beforeId = cat.kittyId;
        cat.kittyId = kittyIds[_to];
        afterId = cat.kittyId;
    }

    function feed() public{
        string memory beforeId;
        string memory afterId;
        (beforeId, afterId) = updateKittyId(_makeRandom());
        emit FeedCat(msg.sender, beforeId, afterId);
    }
    //contract 말고 내부에 선언
  event NewRod(address fisher);
  event BUY_ROD(address buyer, uint256 cost);

  uint internal rand = 0;
  
  struct Rod {
    uint32 rodGrade;
    uint32 rodPrice;
  }
  function _makeRandom(uint32 index) internal returns(uint32){
      if (index == 0) {
        return uint32(uint(keccak256(abi.encodePacked(block.timestamp, rand++, msg.sender))) % 3) + 1;
      } else if(index == 1) {
        return uint32(uint(keccak256(abi.encodePacked(block.timestamp, rand++, msg.sender))) % 5) + 1;
      } else if (index == 2) {
        return uint32(uint(keccak256(abi.encodePacked(block.timestamp, rand++, msg.sender))) % 7) + 1;
      } else if(index == 3) {
        return uint32(uint(keccak256(abi.encodePacked(block.timestamp, rand++, msg.sender))) % 5) + 3;
      }
  }
  //보유중인 낚싯대 정보를 저장
  mapping (address => uint32) rodOwner;

  
  function _createRod() private {
    rodOwner[msg.sender] = _makeRandom(0);
    emit NewRod(msg.sender);
  }

  function getRod() public view returns(uint32 rod){
    rod = rodOwner[msg.sender];
  }

  function newRod(uint32 probability, uint256 cost) public returns(uint32 rod) {
    require(useSSC(cost) == true);

    if (rodOwner[msg.sender] == 0) {
      _createRod();
    } else {
      emit NewRod(msg.sender);
      rodOwner[msg.sender] = _makeRandom(probability);
      rod = rodOwner[msg.sender];
    }

    emit BUY_ROD(msg.sender, cost);
  }

}