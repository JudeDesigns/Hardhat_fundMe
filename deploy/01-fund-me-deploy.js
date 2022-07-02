/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line prettier/prettier
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

const { networks } = require("../hardhat.config");
const { network } = require("hardhat");

// function deployFunc() {
//     console.log("HI")
// }

// module.exports.default = deployFunc
//both syntaxes are the same except the async function is an anonymous function

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  //it's the same as
  //hre.getNamedAccounts
  //hre.deployments

  const {
    networkConfig,
    developmentChains,
  } = require("../helper-hardhat-config");

  const { verify } = require("../utils/verify");

  //syntax above is the same as
  /* 
  const helperConfig = require("../helper-hardhat-config")
  const networkConfig = helperConfig.networkConfig */

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //const ethUSDPriceFeedAddress = networkConfig[chainId].ethUSDPriceFeed;
  let ethUSDPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUSDPriceFeedAddress = ethUsdAggregator.address;
  } else {
    const ethUSDPriceFeedAddress = networkConfig[chainId].ethUSDPriceFeed;
  }

  const args = [ethUSDPriceFeedAddress];
  //main usage of mocks is if the contract doesn't exist, we deploy a minimal version of it on our local network.

  //const address = "0x000ea"
  //The above syntax could be used but it would seem as we are still hardcoding the value. A better way is to fetch the address from the chainID
  //Such as if ChainId is x use address Y.

  //what happens when we want to change chains
  //when going for localhost or hardhat networks, we use Mocks

  //We can add lists of overrides to this
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //put price feed address
    log: true,
  });

  if (
    !developmentChains.includes(chainId.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }

  log("____________________________________");
};
