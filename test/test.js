const CatBase = artifacts.require("CatBase");

contract("CatBase", function([deployer, user1]){
    
    let catBase;

    beforeEach(async () => {
        console.log("===== before each =====");
        catBase = await CatBase.new();
    })

    it("register Test", async () => {
        console.log("===== basic  test =====");
        await catBase.registerCat("test");
        //await catBase.registerCat("test");
        let cat = await catBase.getCatCounts();
        console.log(`${cat}`);

    })

    it.only("get cat Test", async() => {
        console.log("===== getCat  test =====");
        await catBase.registerCat("test");
        let cat = await catBase.getMyCat();
        console.log(cat);
    })
});