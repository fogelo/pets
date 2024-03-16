const path = require("path");

module.exports = (env) => {
  console.log(env);
  return {
    mode: env.production ?? "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
  };
};
