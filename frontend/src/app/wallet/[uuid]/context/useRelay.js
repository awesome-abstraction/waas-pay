import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";

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
    async (web3Provider, safeSelected) => {
      if (web3Provider) {
        setIsRelayerLoading(true);

        const signer = web3Provider.getSigner();
        const relayPack = new GelatoRelayPack();
        const safeAccountAbstraction = new AccountAbstraction(signer);

        await safeAccountAbstraction.init({ relayPack });

        // we use a dump safe transfer as a demo transaction
        const dumpSafeTransafer = [
          {
            to: safeSelected,
            data: "0x",
            value: utils.parseUnits("0.01", "ether").toString(),
            operation: 0, // OperationType.Call,
          },
        ];

        const options = {
          isSponsored: false,
          gasLimit: "600000", // in this alfa version we need to manually set the gas limit
          gasToken: ethers.constants.AddressZero, // native token
        };

        const gelatoTaskId = await safeAccountAbstraction.relayTransaction(
          dumpSafeTransafer,
          options
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
