const fs = require("fs");
const Web3 = require('web3');
const request = require("request-promise");
let web3 = new Web3('http://localhost:8545');

async function startOracleScheduler() {
  const response = await request.get('https://api.binance.com/api/v1/ticker/24hr?symbol=ETHUSDT');
  const data = JSON.parse(response);
  console.log(JSON.parse(response));

  //https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#id38
}

// Call startEventListener function to watch for events in PriceOracle contract
startOracleScheduler();