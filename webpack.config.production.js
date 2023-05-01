const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "scripts"),
    publicPath: "scripts/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
  },
  devtool: "cheap-source-map",
};
