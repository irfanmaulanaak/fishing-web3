// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract NFTFish is ERC721URIStorage, Ownable {
    event Minted(
        address owner,
        uint256 tokenId,
        string tokenURI
    );

    constructor() ERC721("Fishing Game", "FISH") {}

    function mint(
        address callerAddress,
        uint256 tokenId,
        string memory tokenURI
    ) public {
        require(!(_exists(tokenId)), "Token ID already minted!");
        _mint(callerAddress, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit Minted(callerAddress, tokenId, tokenURI);
    }
}