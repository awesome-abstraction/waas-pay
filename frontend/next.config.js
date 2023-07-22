/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    WEB3AUTH_CLIENT_ID: process.env.WEB3AUTH_CLIENT_ID,
    GOERLI_INFURA_KEY: process.env.INFURA_KEY,
  },
};
