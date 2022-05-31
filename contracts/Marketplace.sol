// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Open Zeppelin libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./NFTFish.sol";

contract Marketplace is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    address NFTAddress;
    address platformAddress;

    event buyEvent(address buyer, address seller, uint256 tokenId, uint256 price, uint256 timestamp);
    event sellEvent(address seller, uint256 tokenId, uint256 timestamp);
    function initialize(address _NFTAddresss, address _platformAddress) public initializer {
        NFTAddress = _NFTAddresss;
        platformAddress = _platformAddress;
      ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
       __Ownable_init();
   }
   
   ///@dev required by the OZ UUPS module
   function _authorizeUpgrade(address) internal override onlyOwner {}
   
   function buy(address seller, uint256 tokenId) external payable {
       require(msg.value > 0 , "MSG VALUE INVALID");
       (bool sent, bytes memory data) = payable(seller).call{value: msg.value}("");
       require(sent, "Failed to send Ether");
       NFTFish(NFTAddress).safeTransferFrom(seller, _msgSender(), tokenId);
       emit buyEvent(_msgSender(), seller, tokenId, msg.value, block.timestamp);
   }
   function sell(uint256 tokenId) external {
       NFTFish(NFTAddress).approve(address(this), tokenId);
       emit sellEvent(_msgSender(), tokenId, block.timestamp);

   }
}