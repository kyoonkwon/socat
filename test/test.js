const CatBase = artifacts.require("CatBase");
const coin = 10 ** 15;

contract("CatBase", function([deployer, user1]){
    
    let cat;

    beforeEach(async () => {
        console.log("===== before each =====");
        cat = await CatBase.new("soso coin", "SSC");
        var owner = await cat.getOwner();
        var ownerEth = await web3.eth.getBalance(owner);
        var ownerSSC = await cat.balanceOf(owner);
        var user1SSC = await cat.balanceOf(user1);
        console.log(ownerEth);
        console.log(ownerSSC);
        console.log(user1SSC);

        
    })

    it("check soso coin", async () => {
        console.log("==== checking balance ===");
        
        await cat.ethToSSC({from:user1, value:coin});


        var x1 = await cat.balanceOf(deployer);
        var y1 = await cat.balanceOf(user1);
        var x2 = await cat.SSCtoEth({from:user1, value:coin});
        var x3 = await cat.balanceOf(deployer);
        var y3 = await cat.balanceOf(user1);

        console.log("owner ssc", x1, x3);
        console.log("user1 ssc", y1, y3);

    })

});