// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PaymentProcessor {
    address public immutable merchant; // who can withdraw

    event Paid(bytes32 indexed orderId, address indexed payer, uint256 amount);
    event Withdrawn(address indexed merchant, uint256 amount);

    mapping(address => uint256) public balances; // merchant => balance
    mapping(bytes32 => uint256) public orderAmount; // orderId => amount (optional tracking)

    constructor(address _merchant) {
        require(_merchant != address(0), "merchant=0");
        merchant = _merchant;
    }

    // Pay by sending ETH with an order id
    function pay(bytes32 orderId) external payable {
        require(msg.value > 0, "no ETH");
        require(orderAmount[orderId] == 0, "order exists"); // idempotency

        orderAmount[orderId] = msg.value;
        balances[merchant] += msg.value;
        emit Paid(orderId, msg.sender, msg.value);
    }

    // Merchant withdraws accumulated ETH
    function withdraw(uint256 amount) external {
        require(msg.sender == merchant, "not merchant");
        require(balances[merchant] >= amount, "insufficient");
        balances[merchant] -= amount;
        (bool ok, ) = payable(merchant).call{value: amount}("");
        require(ok, "send failed");
        emit Withdrawn(merchant, amount);
    }
}