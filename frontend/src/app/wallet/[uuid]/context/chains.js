import config from "../../../../config";

export const getChainById = (chainId) => {
  return chains.find((chain) => chain.id === chainId);
};

export const goerliChain = {
  id: "0x5",
  token: "gETH",
  label: "Görli",
  shortName: "gor",
  rpcUrl: `https://goerli.infura.io/v3/${config.goerliInfuraKey}`,
  blockExplorerUrl: "https://goerli.etherscan.io",
  color: "#fbc02d",
  transactionServiceUrl: "https://safe-transaction-goerli.safe.global",
  isStripePaymentsEnabled: false,
  faucetUrl: "https://goerlifaucet.com/",
};

export const polygonChain = {
  id: "0x89",
  token: "matic",
  shortName: "matic",
  label: "Polygon",
  rpcUrl: "https://polygon-rpc.com",
  blockExplorerUrl: "https://polygonscan.com",
  color: "#8248E5",
  transactionServiceUrl: "https://safe-transaction-polygon.safe.global",
  isStripePaymentsEnabled: false,
  faucetUrl: "https://faucet.polygon.technology/",
};

const chains = [goerliChain, polygonChain];

export default chains;
