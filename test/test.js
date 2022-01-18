const CatBase = artifacts.require("CatBase");
const coin = 10 ** 15;

contract("CatBase", function([deployer, user1]){
    
    let cat;

    beforeEach(async () => {
        console.log("===== before each =====");
        cat = await CatBase.new("soso coin", "SSC");
        // var owner = await cat.getOwner();
        // var ownerEth = await web3.eth.getBalance(owner);
        // var ownerSSC = await cat.balanceOf(owner);
        // var user1SSC = await cat.balanceOf(user1);
        // console.log(ownerEth);
        // console.log(ownerSSC);
        // console.log(user1SSC);

        
    })

    // it("check soso coin", async () => {
    //     console.log("==== checking balance ===");
        
    //     await cat.ethToSSC({from:user1, value:coin});

    //     var x1 = await cat.balanceOf(deployer);
    //     var y1 = await cat.balanceOf(user1);
    //     var x2 = await cat.SSCtoEth({from:user1, value:coin});
    //     var x3 = await cat.balanceOf(deployer);
    //     var y3 = await cat.balanceOf(user1);

    //     console.log("owner ssc", x1, x3);
    //     console.log("user1 ssc", y1, y3);
    // })

    // it("new fish test", async () => {
    //     console.log("new!");
    //     await cat.newFish({from:user1});
    //     var x = await cat.getFish({from:user1});
    //     console.log(x[0]);


    // })

    // it("feed and getSSC test", async () => {
    //     console.log("===== in =====");
    //     var acc = await cat.balanceOf(user1);
    //     console.log(acc);
    //     await cat.getSSC(3,{from:user1});
    //     acc = await cat.balanceOf(user1);
    //     console.log(acc);
    //     console.log("===== out =====");
    // })
    it("feed and getSSC test", async () => {
        cat = await CatBase.new("soso coin", "SSC");
        console.log("===== in =====");
        await cat.registerCat("jeho",{from:user1});
        var cat = await cat.getMyCat({from:user1});
        console.log(cat);
        await cat.feed(3,{from:user1});
        cat = await cat.getMyCat({from:user1});
        console.log(cat);
        console.log("===== out =====");
    })
    
    

});