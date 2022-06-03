require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

module.exports = {
 solidity: "0.8.13",
 networks: {
   ropsten: {
     url: "https://ropsten.infura.io/v3/439b4ade591f4c0480738ea457ccf22d",
     accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
     gasPrice: 50000000000
   },
   shibuya: {
     url: "https://evm.shibuya.astar.network",
     accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
     gasPrice: 30000000000
   }
 },
 etherscan: {
   apiKey: process.env.ETHERSCAN_API_KEY,
 },
};