const PriceOracle = artifacts.require("PriceOracle");

contract('PriceOracle', (accounts) => {

  it('should return contract owner', async () => {
    const priceOracle = await PriceOracle.deployed();

    console.log('address', priceOracle.address);

    const owner = await priceOracle.owner.call();

    assert.equal(owner, accounts[0]);
  });

  it('should get initial data', async () => {
    const priceOracle = await PriceOracle.deployed();

    const price = await priceOracle.getPrice.call();

    assert.equal(price.toString(10), 0);
  });

  it('should set price by contract owner', async () => {
    const priceOracle = await PriceOracle.deployed();

    const time = parseInt((new Date()).getTime().toString().substring(0, 10), 10);

    await priceOracle.setPrice(web3.utils.toWei("231.9", "ether"), time + 600, {from: accounts[0]});

    const price = await priceOracle.getPrice.call();

    assert.equal(price.toString(10), web3.utils.toWei("231.9", "ether"));
  }); 

  it('should reject set price without contract owner', async () => {
    try {
      const priceOracle = await PriceOracle.deployed();

      await priceOracle.setPrice(10, 1565064000, {from: accounts[1]});
    } catch (err) {
      assert.equal(err.message, "Returned error: VM Exception while processing transaction: revert -- Reason given: Ownable: caller is not the owner.");
    }
  });

})