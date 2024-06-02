/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
  env: {
    APP_VERSION: version,
  },
};

module.exports = nextConfig;
