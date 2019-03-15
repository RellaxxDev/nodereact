const path    = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};