const path = require("path");

const updateWebpackConfig = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
      ({ constructor }) =>
        constructor && constructor.name === "ModuleScopePlugin"
    );

    webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

    const loader = webpackConfig.module.rules[1].oneOf.find(
      (r) => r.loader && r.loader.indexOf("babel-loader") !== -1
    );
    loader.include = [
      path.join(__dirname, "src"),
      path.join(__dirname, "../models"), // This is the directory containing the symlinked-to files
    ];

    return webpackConfig;
  },
};

module.exports = {
  plugins: [{ plugin: updateWebpackConfig, options: {} }],
  eslint: {
    enable: false,
  },
};
