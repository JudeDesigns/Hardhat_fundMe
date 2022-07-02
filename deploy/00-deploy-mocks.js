/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-require */
const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITIALANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  //   const chainId = network.config.chainId;

  if (developmentChains.includes(network.name)) {
    log("Local network detected deploying mocks");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIALANSWER],
    });
    log("Mocks deployed");
    log("_______________________________");
  }
};

module.exports.tags = ["all", "mocks"];
