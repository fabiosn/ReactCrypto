const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    proxy: {
      "/api": {
        target: "https://api.coinmarketcap.com/v1/ticker/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
