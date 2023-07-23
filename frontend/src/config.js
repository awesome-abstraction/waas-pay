export default {
  apiUrl: process.env.API_URL || "http://localhost:4000",
  web3AuthClientId: process.env.WEB3AUTH_CLIENT_ID || "WEB3AUTH_CLIENT_ID",
  goerliInfuraKey: process.env.GOERLI_INFURA_KEY || "INFURA_KEY",
  gelatoRelayApiKey: process.env.GELATO_RELAY_API_KEY || "GELATO_API_KEY",
};
