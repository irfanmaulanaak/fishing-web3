const { ethers, upgrades } = require("hardhat");

var NFTAddress
var NFTentity
const platformAddress = "0xEE349714fBf674DEBC335561C86aE47ddE743F5A"

async function deployNFT() {
  const NFTDeployer = await ethers.getContractFactory("NFTFish")
  console.log("Deploying NFT...")
  NFTentity = await NFTDeployer.deploy()
  await NFTentity.deployed()
  NFTAddress = NFTentity.address
  console.log("NFT Address deployed to: ", NFTAddress)
  deployMarketplace();
}

async function deployMarketplace() {
 const Marketplace = await ethers.getContractFactory("Marketplace");

 console.log("Deploying Marketplace...");

 const marketplace = await upgrades.deployProxy(Marketplace, [NFTAddress, platformAddress], {
   initializer: "initialize",
 });
 await marketplace.deployed();

 console.log("Marketplace deployed to:", marketplace.address);
}

async function main(){
  deployNFT();
}


main();