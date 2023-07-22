// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;

import {BasePluginWithEventMetadata, PluginMetadata} from "./Base.sol";
import {ISafe} from "@safe-global/safe-core-protocol/contracts/interfaces/Accounts.sol";
import {ISafeProtocolManager} from "@safe-global/safe-core-protocol/contracts/interfaces/Manager.sol";
import {SafeTransaction, SafeProtocolAction} from "@safe-global/safe-core-protocol/contracts/DataTypes.sol";
import {_getFeeCollectorRelayContext, _getFeeTokenRelayContext, _getFeeRelayContext} from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";

contract AccessControlPlugin is BasePluginWithEventMetadata {

    error FeePaymentFailure(bytes data);
    address public trustedOrigin;
    mapping(address => bool) public blockedAddresses;

    event BlockedAddressAdded(address indexed blockedAddress);
    event BlockedAddressRemoved(address indexed blockedAddress);

    constructor(
        address _trustedOrigin
    ) 
    BasePluginWithEventMetadata(
        PluginMetadata({
            name: "WaaS Pay Access Control Plugin",
            version: "1.0.0",
            requiresRootAccess: false,
            iconUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F510%2F362%2Fpng-transparent-access-control-cdr-others-cdr-text-black.png&tbnid=f4ClbA5vbFS51M&vet=12ahUKEwioveHtgaOAAxVPuicCHcDUBd4QMygHegUIARDgAQ..i&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3DAccess%2Bcontrol&docid=GmJXTfbF_ddHPM&w=920&h=920&q=access%20control%20logo&ved=2ahUKEwioveHtgaOAAxVPuicCHcDUBd4QMygHegUIARDgAQ",
            appUrl: "https://github.com/awesome-abstraction/waas-pay/"
        })
    )
    {
        trustedOrigin = _trustedOrigin;
    }

    modifier onlyOriginAddress() {
        require(msg.sender == trustedOrigin, "Only the owner can perform this action");
        _;
    }

    function notBlocked(address _address) internal returns (bool){
        require(!blockedAddresses[_address], "This address is blocked");
        return true;
    }

    function addBlockedAddress(address _address) onlyOriginAddress external {
        require(_address != address(0), "Invalid address");
        require(!blockedAddresses[_address], "Address is already blocked");
        blockedAddresses[_address] = true;
        emit BlockedAddressAdded(_address);
    }

    function removeBlockedAddress(address _address) external onlyOriginAddress {
        require(blockedAddresses[_address], "Address is not blocked");
        blockedAddresses[_address] = false;
        emit BlockedAddressRemoved(_address);
    }

    function executeFromPlugin(ISafeProtocolManager manager, ISafe safe, bytes calldata data) external {
        require(notBlocked(msg.sender), "This address has been blocked");

        uint256 nonce = uint256(keccak256(abi.encode(this, manager, safe, data)));
        SafeProtocolAction[] memory actions = new SafeProtocolAction[](1);
        actions[0].data = data;
    
        SafeTransaction memory safeTx = SafeTransaction({actions: actions, nonce: nonce, metadataHash: bytes32(0)});
        try manager.executeTransaction(safe, safeTx) returns (bytes[] memory) {} catch (bytes memory reason) {
            revert FeePaymentFailure(reason);
        }
    }
}

