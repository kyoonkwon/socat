var CatBase = artifacts.require("./CatBase.sol");

module.exports = function(deployer) {
    deployer.deploy(CatBase, "soso coin", "SSC");
  };