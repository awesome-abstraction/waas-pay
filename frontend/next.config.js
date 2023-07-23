/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },

  reactStrictMode: false,

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      snarkyjs: require("path").resolve("node_modules/snarkyjs"),
    };
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  // To enable SnarkyJS for the web, we must set the COOP and COEP headers.
  // See here for more information: https://docs.minaprotocol.com/zkapps/how-to-write-a-zkapp-ui#enabling-coop-and-coep-headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

module.exports = {
  ...nextConfig,
  env: {
    API_URL: process.env.API_URL,
    WEB3AUTH_CLIENT_ID: process.env.WEB3AUTH_CLIENT_ID,
    GOERLI_INFURA_KEY: process.env.GOERLI_INFURA_KEY,
    GELATO_RELAY_API_KEY: process.env.GELATO_RELAY_API_KEY,
  },
};
