// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

import "./CatBase.sol";

contract CatFeed is CatBase{


    event FeedCat(address feeder);

    function feed() public{
        updateKittyId(_makeRandom());
        emit FeedCat(msg.sender);
    }



}