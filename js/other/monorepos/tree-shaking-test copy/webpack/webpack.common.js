const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = (vendor) => {
  return {
    entry: path.join(__dirname, "..", "src", "index.tsx"),
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    mode: "development",
    optimization: {
      usedExports: true,
      sideEffects: true,
    },
    output: {
      path: path.join(__dirname, "..", "build"),
      filename: path.join("static", "bundle.[contenthash].js"),
      assetModuleFilename: "images/[name].[contenthash][ext]",
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["babel-plugin-styled-components"],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ico|png|jpe?g|svg|gif)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "..", "public", `${vendor}`, "index.html"),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "..", "public", `${vendor}`, "favicon.ico"),
            to: path.join(__dirname, "..", "build"),
          },
        ],
      }),
      new BundleAnalyzerPlugin({}),
    ],
  }
}
