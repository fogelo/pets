const path = require("path")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    // open: true,
    client: {
      overlay: false,
    },
    watchFiles: path.join(__dirname, "src"),
    hot: true,
    port: 8081,
    proxy: {
      "/api": "http://localhost:8060",
      "/files": "http://localhost:8060",
    },
    historyApiFallback: true,
  },
  module: {
    rules: [],
  },
  plugins: [new ReactRefreshWebpackPlugin({ overlay: false })],
}
