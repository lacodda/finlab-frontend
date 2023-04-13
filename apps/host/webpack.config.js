const { composePlugins, withNx } = require("@nrwl/webpack");
const { withReact } = require("@nrwl/react");
const { withModuleFederation } = require("@nrwl/react/module-federation");

const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
]);

const baseConfig = require("./module-federation.config");

const config = {
  ...baseConfig,
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return {
        ...defaultConfig,
        eager: true,
      };
    }
    // Returning false means the library is not shared.
    return false;
  },
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config)
);
