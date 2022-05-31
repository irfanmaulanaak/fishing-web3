require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

module.exports = {
 solidity: "0.8.10",
 networks: {
   kovan: {
     url: "https://ropsten.infura.io/v3/439b4ade591f4c0480738ea457ccf22d",
     accounts: [process.env.PRIVATE_KEY],
   },
 },
 etherscan: {
   apiKey: process.env.ETHERSCAN_API_KEY,
 },
};