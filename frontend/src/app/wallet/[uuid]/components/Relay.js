import { Button, Dropdown, Input, Loading, Typography } from "@web3uikit/core";
import { Blockie } from "@web3uikit/web3";
import { utils } from "ethers";
import { useState } from "react";
import styled from "styled-components";
import { isAddress } from "web3-validator";
import { useCreateWallet } from "../context/CreateWalletContext";
import chains, { getChainById } from "../context/chains";
import GelatoTaskStatus from "./GelatoStatus";

const Relay = () => {
  const [chainId, setChainId] = useState("0x5"); // 5 === goreli 100;
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0.01);

  const {
    ownerAddress,
    // chainId,
    chain,
    safes,
    safeSelected,
    safeBalance,
    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,
    isAuthenticated,
    loginWeb3Auth,
    web3Provider,
    userInfo,
    logoutWeb3Auth,
  } = useCreateWallet();

  const [transactionHash, setTransactionHash] = useState("");

  const funds = Number(utils.formatEther(safeBalance || "0"));

  const hasNoFunds = funds <= 0;
  const hasInsufficientFunds = funds < amount;

  if (!isAuthenticated) {
    return (
      <Container>
        <Button text="Connect To Send" onClick={loginWeb3Auth} />
      </Container>
    );
  }

  return (
    <Container>
      <LogOutContainer>
        <Button
          style={{ width: "100%" }}
          theme="secondary"
          size="small"
          //size="xl"
          text="Log out"
          onClick={logoutWeb3Auth}
        />
      </LogOutContainer>
      <div>
        <AvatarContainer>
          <div style={{ flexShrink: 0, marginTop: "0.25rem" }}>
            <Blockie
              seed={
                ownerAddress || "0x0000000000000000000000000000000000000000"
              }
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h1" color="#fff" style={{ margin: 0 }}>
              {userInfo?.name || "Anonymous"}
            </Typography>
          </div>
        </AvatarContainer>
        <Typography variant="caption12" color="#ccc">
          Owner Address: {ownerAddress}
        </Typography>
        <SafesBox>
          <Typography variant="h3" color="#fff">
            Send Funds
          </Typography>
        </SafesBox>
        <div>
          <Typography variant="h5" color="#ccc">
            Safe Account: {safeSelected || "No Safes"}
          </Typography>
          <div>
            <Typography variant="h6" color="#ccc">
              Balance: {funds} {chain.token}
            </Typography>
          </div>
        </div>

        <div
          style={{ marginTop: "0.5rem", display: "flex", columnGap: "0.75rem" }}
        >
          <div>
            <Typography
              variant="caption10"
              color="#fff"
              style={{ marginLeft: "0.25rem" }}
            >
              Chain Type
            </Typography>
            <Dropdown
              label="Chain: "
              onChange={(e) => setChainId(e.id)}
              value={chainId}
              hideSelected={false}
              options={chains.map((chain) => ({
                id: chain.id,
                label: chain.label,
              }))}
            />
          </div>
          <div style={{ maxWidth: "5rem" }}>
            <Typography
              type="number"
              variant="caption10"
              color="#fff"
              style={{ marginLeft: "0.25rem" }}
            >
              Amount
            </Typography>
            <Input
              style={{ color: "white" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "0.75rem" }}>
          <Typography
            variant="caption10"
            color="#fff"
            style={{ marginLeft: "0.25rem" }}
          >
            Destination Address
          </Typography>
          <Input
            errorMessage="Invalid Address"
            state={
              !destinationAddress || isAddress(destinationAddress)
                ? undefined
                : "error"
            }
            style={{ color: "white !important", width: "100%" }}
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
        </div>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {safeSelected && (
            <div>
              <Typography color="#fff" variant="body16">
                Transfer {amount} {getChainById(chainId)?.token}
              </Typography>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {isAddress(destinationAddress) ? (
                  <Typography color="#fff" variant="caption12">
                    {destinationAddress}
                  </Typography>
                ) : (
                  <p></p>
                )}
                <Typography color="#fff" variant="caption12">
                  {"->"}
                </Typography>
                <Typography color="#fff" variant="caption12">
                  {safeSelected}
                </Typography>
              </div>
            </div>
          )}
        </div>
        {!isRelayerLoading && !gelatoTaskId && (
          <div style={{ marginTop: "1rem" }}>
            <Button
              size="large"
              theme="primary"
              text="Send Transaction"
              disabled={
                !isAddress(destinationAddress) ||
                hasNoFunds ||
                hasInsufficientFunds
              }
              onClick={() => relayTransaction(web3Provider, safeSelected)}
            />
            {(hasNoFunds || hasInsufficientFunds) &&
              getChainById(chainId)?.faucetUrl && (
                <div style={{ marginTop: "0.25rem" }}>
                  <Typography color="#ccc" variant="caption12">
                    {(() => {
                      if (!hasNoFunds) return "Your account is empty. ";
                      if (hasInsufficientFunds)
                        return "Your account has insufficient funds. ";
                    })()}
                    <a
                      style={{ color: "#e93c2f" }}
                      href={getChainById(chainId)?.faucetUrl}
                      target="_blank"
                    >
                      Request {getChainById(chainId)?.token}.
                    </a>
                  </Typography>
                </div>
              )}
          </div>
        )}
        <div style={{ display: "flex", columnGap: "3rem", marginTop: "1rem" }}>
          <div>
            {gelatoTaskId && !isRelayerLoading && (
              <>
                <GelatoTaskStatus
                  gelatoTaskId={gelatoTaskId}
                  chainId={chainId}
                  setTransactionHash={setTransactionHash}
                  transactionHash={transactionHash}
                />
              </>
            )}
            {isRelayerLoading && (
              <div style={{ marginTop: "1.5rem" }}>
                <Loading size={14} spinnerColor="#2E7DAF" spinnerType="wave" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const LogOutContainer = styled.div`
  position: absolute;
  top: 13%;
  right: 20%;
`;

const Container = styled.div`
  position: relative;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SafesBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export default Relay;
