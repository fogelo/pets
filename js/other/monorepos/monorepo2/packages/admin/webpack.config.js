const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      //   {
      //     test: /\.(ts|tsx)$/,
      //     use: 'babel-loader',
      //     exclude: /node_modules/
      //   },
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "development",
};
