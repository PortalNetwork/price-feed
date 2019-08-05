const PriceOracle = artifacts.require("PriceOracle");

contract('PriceOracle', (accounts) => {

  it('should return contract owner', async () => {
    const priceOracle = await PriceOracle.deployed();

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

    await priceOracle.setPrice(10, 0, {from: accounts[0]});

    const price = await priceOracle.getPrice.call();

    assert.equal(price.toString(10), 10);
  }); 

  it('should reject set price without contract owner', async () => {
    try {
      const priceOracle = await PriceOracle.deployed();

      await priceOracle.setPrice(10, 0, {from: accounts[1]});
    } catch (err) {
      assert.equal(err.message, "Returned error: VM Exception while processing transaction: revert -- Reason given: Ownable: caller is not the owner.");
    }
  });

})