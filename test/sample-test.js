const { expect } = require('chai')
const { BigNumber } = require('ethers')
const { ethers, upgrades } = require('hardhat')
// const { contractAddress, contractAbi } = require("../config")

describe('Staking', function () {
  var NFTAddress
  var NFTentity
  var marketplace
  const platformAddress = "0xEE349714fBf674DEBC335561C86aE47ddE743F5A"

  it('Deploy NFT', async function () {
    const NFTDeployer = await ethers.getContractFactory("NFTFish")
    console.log("Deploying NFT...")
    NFTentity = await NFTDeployer.deploy()
    await NFTentity.deployed()
    NFTAddress = NFTentity.address
    console.log("NFT Address deployed to: ", NFTAddress)
  })

  it('Deploy Marketplace', async function () {
    const Marketplace = await ethers.getContractFactory("Marketplace");

    console.log("Deploying Marketplace...");
   
    marketplace = await upgrades.deployProxy(Marketplace, [NFTAddress, platformAddress], {
      initializer: "initialize",
    });
    await marketplace.deployed();
   
    console.log("Marketplace deployed to:", marketplace.address);
  })
  it('Mint Token NFT', async function () {
    const MintNFT = await NFTentity.mint("0xEE349714fBf674DEBC335561C86aE47ddE743F5A",1, "https://")
    await MintNFT.wait()
    const equalto = await NFTentity.ownerOf(1)
    expect(equalto.toString()).to.equal("0xEE349714fBf674DEBC335561C86aE47ddE743F5A")
  })
  it('Approve NFT', async function () {
    const ApproveNFT = await NFTentity.approve(marketplace.address, 1)
    await ApproveNFT.wait()
    expect(ApproveNFT.hash).to.not.null
  })
  it('Buy NFT', async function () {
    const [addr1, addr2, addr3] = await ethers.getSigners()
    
    const BuyNFT = await marketplace.connect(addr2).buy(addr1.address, 1, {value: ethers.utils.parseEther("1")})
    await BuyNFT.wait()
    expect(BuyNFT.hash).to.not.null
  })
})