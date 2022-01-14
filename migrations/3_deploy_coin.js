var INVENToken = artifacts.require("./InvenToken.sol");

module.exports = function(deployer) {
    deployer.deploy(INVENToken);
  };