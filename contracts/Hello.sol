// contracts/Hello.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    string public message = "Hello from Solidity!";

    function getMessage() public view returns (string memory) {
        return message;
    }
}