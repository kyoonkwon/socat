var CatFeed = artifacts.require("./CatFeed.sol");

module.exports = function(deployer) {
    deployer.deploy(CatFeed);
  };