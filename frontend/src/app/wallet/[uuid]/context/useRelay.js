import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import config from "../../../../config";

const useRelay = () => {
  const [isRelayerLoading, setIsRelayerLoading] = useState(false);
  const [gelatoTaskId, setGelatoTaskId] = useState();

  // refresh the Gelato task id
  useEffect(() => {
    setIsRelayerLoading(false);
    setGelatoTaskId(undefined);
  }, []); //[chainId]);

  // relay-kit implementation using Gelato
  const relayTransaction = useCallback(
    // make signer instead?
    async (
      web3Provider,
      safeAddress,
      destinationAddress = "0x7A67fF6354d983B6cfc3a7f7C5BA93f73C864b32",
      amount = "0.001"
    ) => {
      if (web3Provider) {
        setIsRelayerLoading(true);

        const signer = web3Provider.getSigner();
        const withdrawAmount = utils.parseUnits(amount, "ether").toString();
        const gasLimit = "600000";
        // const chainId = 5; // 5 === goreli 100;
        // const chainIdSigner = await signer.getChainId();

        const safeTransactionData = [
          {
            to: destinationAddress,
            data: "0x",
            value: withdrawAmount,
            operation: OperationType.Call, // 0
          },
        ];

        const safeTransactionOptions = {
          isSponsored: true,
          gasLimit, // in this alfa version we need to manually set the gas limit
          gasToken: ethers.constants.AddressZero, // native token
        };

        const relayKit = new GelatoRelayPack(config.gelatoRelayApiKey);
        const safeAccountAbstraction = new AccountAbstraction(signer);
        await safeAccountAbstraction.init({ relayPack: relayKit });

        const gelatoTaskId = await safeAccountAbstraction.relayTransaction(
          safeTransactionData,
          safeTransactionOptions
        );

        setIsRelayerLoading(false);
        setGelatoTaskId(gelatoTaskId);
      }
    },
    [setGelatoTaskId, setIsRelayerLoading]
  );

  return {
    gelatoTaskId,
    isRelayerLoading,
    relayTransaction,
  };
};

export default useRelay;
