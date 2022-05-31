// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Bait is ERC20 {
  constructor(string memory name, string memory symbol) ERC20(name, symbol){
    _mint(msg.sender, 100000000 * 10**18);
}
