const { ethers, upgrades } = require("hardhat");

var NFTAddress
var NFTentity
const platformAddress = ""

async function deployNFT() {
  const NFTDeployer = await ethers.getContractFactory("NFTFish")
  console.log("Deploying NFT...")
  NFTentity = await NFTDeployer.deploy()
  await NFTentity.deployed()
  NFTAddress = NFTentity.address
  console.log("NFT Address deployed to: ", NFTAddress)
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
  deployMarketplace();
}


main();