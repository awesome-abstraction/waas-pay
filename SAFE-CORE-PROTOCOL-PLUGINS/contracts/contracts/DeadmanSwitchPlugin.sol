// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;
import {BasePluginWithEventMetadata, PluginMetadata} from "./Base.sol";
import {ISafe} from "@safe-global/safe-core-protocol/contracts/interfaces/Accounts.sol";
import {ISafeProtocolManager} from "@safe-global/safe-core-protocol/contracts/interfaces/Manager.sol";
import {SafeTransaction, SafeProtocolAction} from "@safe-global/safe-core-protocol/contracts/DataTypes.sol";
import {_getFeeCollectorRelayContext, _getFeeTokenRelayContext, _getFeeRelayContext} from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";

contract DeadmanSwitchPlugin is BasePluginWithEventMetadata  {
    
    uint256 validUntil;
    address payable recipient;
    error UntrustedOrigin(address origin);

    event SwitchTriggered(address indexed user);

    constructor(
        uint256 _validUntil,
        address payable _recipient
    )
        BasePluginWithEventMetadata(
            PluginMetadata({
                name: "Waas Pay DeadmanSwitch Plugin",
                version: "1.0.0",
                requiresRootAccess: false,
                iconUrl: "",
                appUrl: "https://github.com/awesome-abstraction/waas-pay/"
            })
        )
    {
        validUntil=  _validUntil;
        recipient =  _recipient;
    }

    function isTriggered() public view returns (bool) {
        return block.timestamp > validUntil;
    }

    function trigger(ISafeProtocolManager manager, ISafe safe, uint256 nonce) public payable{
        require(isTriggered(), "DeadmanSwitch has not been triggered");
        emit SwitchTriggered(msg.sender);
        // Perform the action to be executed upon switch trigger (e.g., transfer funds to the recipient).
        // Note: Make sure to handle potential reentrancy issues if the action involves interactions with other contracts.
        
        bool success = recipient.send(msg.value);
        require(success, "Fund Transfer failed");
    }

    function executeFromPlugin(ISafeProtocolManager manager, ISafe safe, bytes calldata data) external {
        
        if (recipient != address(0) && msg.sender != recipient) revert UntrustedOrigin(msg.sender);

        // We use the hash of the tx to relay has a nonce as this is unique
        uint256 nonce = uint256(keccak256(abi.encode(this, manager, safe, data)));
        trigger(manager, safe, nonce);

    }
}
