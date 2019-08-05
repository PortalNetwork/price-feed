const PriceFeed = artifacts.require("PriceFeed");
const FeedFactory = artifacts.require("FeedFactory");
const Medianizer = artifacts.require("Medianizer");

const PriceOracle = artifacts.require("PriceOracle");

module.exports = function(deployer) {
  deployer.deploy(PriceFeed);
  deployer.deploy(FeedFactory);

  deployer.deploy(PriceOracle);
};
