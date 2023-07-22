import { utils } from "ethers";
import { useState } from "react";
import { useCreateWallet } from "../context/CreateWalletContext";
import GelatoTaskStatus from "./GelatoStatus";

const transferAmount = 0.01;

const Relay = () => {
  const {
    chainId,
    chain,
    safeSelected,
    safeBalance,
    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,
    isAuthenticated,
    loginWeb3Auth,
    web3Provider,
  } = useCreateWallet();

  const [transactionHash, setTransactionHash] = useState("");

  // TODO: ADD PAY FEES USING USDC TOKEN

  const hasNativeFunds =
    !!safeBalance &&
    Number(utils.formatEther(safeBalance || "0")) > transferAmount;

  console.log("chain", chain);

  return (
    <>
      {!isAuthenticated ? (
        <div>
          <button onClick={loginWeb3Auth}>Connect Relay Kit</button>
        </div>
      ) : (
        <div style={{ display: "flex", columnGap: "3rem" }}>
          {/* safe Account */}
          <div>
            <p>Safe Account</p>
            <p>
              Your Safe account (Smart Contract) holds and protects your assets.
            </p>
            {safeSelected && <p>Safe Address: {safeSelected}</p>}
          </div>

          {/* Relay Transaction */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "flex-start",
              flexShrink: 0,
            }}
          >
            <p>Relayed transaction</p>
            {/* Gelato status label */}
            {gelatoTaskId && (
              <>
                <p>
                  Gelato Task Id: {gelatoTaskId}
                  Chain Id: {chainId}
                  Transaction Hash: {transactionHash}
                </p>
                <GelatoTaskStatus
                  gelatoTaskId={gelatoTaskId}
                  chainId={chainId}
                  setTransactionHash={setTransactionHash}
                  transactionHash={transactionHash}
                />
              </>
            )}

            {isRelayerLoading && <p>Relayer Loading...</p>}

            {!isRelayerLoading && !gelatoTaskId && (
              <>
                <p>Check the status of your relayed transaction.</p>

                {/* send fake transaction to Gelato relayer */}
                <button
                  disabled={!hasNativeFunds}
                  onClick={() => relayTransaction(web3Provider, safeSelected)}
                >
                  Send Transaction
                </button>

                {!hasNativeFunds && chain?.faucetUrl && (
                  <span>
                    You need funds,{" "}
                    <a href={chain.faucetUrl} target="_blank">
                      request 0.5 {chain.token}.
                    </a>
                  </span>
                )}
              </>
            )}

            {/* Transaction details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                Transfer {transferAmount} {chain?.token}
              </p>

              {safeSelected && (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <p>{safeSelected}</p>
                  <p>{"->"}</p>
                  <p>{safeSelected}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Relay;
