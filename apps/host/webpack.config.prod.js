const { composePlugins, withNx } = require("@nrwl/webpack");
const { withReact } = require("@nrwl/react");
const { withModuleFederation } = require("@nrwl/react/module-federation");

const baseConfig = require("./module-federation.config");

const prodConfig = {
  ...baseConfig,
  remotes: [
    ["auth", "http://localhost:3000/auth"],
    ["work-time", "http://localhost:3000/work-time"],
  ],
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(prodConfig)
);
