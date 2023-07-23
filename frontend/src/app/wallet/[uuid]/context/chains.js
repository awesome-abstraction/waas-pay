import config from "../../../../config";

export const getChainById = (chainId) => {
  return chains.find((chain) => chain.id === chainId);
};

export const goerliChain = {
  idInt: 5,
  id: "0x5",
  token: "gETH",
  label: "Görli",
  shortName: "gor",
  rpcUrl: `https://goerli.infura.io/v3/${config.goerliInfuraKey}`,
  blockExplorerUrl: "https://goerli.etherscan.io",
  color: "#fbc02d",
  transactionServiceUrl: "https://safe-transaction-goerli.safe.global",
  faucetUrl: "https://goerlifaucet.com/",
};

export const mumbaiChain = {
  idInt: 80001,
  id: "0x13881",
  token: "matic",
  shortName: "matic",
  label: "Mumbai",
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  blockExplorerUrl: "https://mumbai.polygonscan.com",
  color: "#8248E5",
  faucetUrl: "https://mumbaifaucet.com/",
};

const chains = [goerliChain, mumbaiChain];

export default chains;
