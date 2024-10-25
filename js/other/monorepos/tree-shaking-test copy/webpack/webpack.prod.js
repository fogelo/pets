const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
  module: {
    rules: [],
  },
  plugins: [new CleanWebpackPlugin()],
};
