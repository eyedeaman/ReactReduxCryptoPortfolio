var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true, //Needed for react router to work
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["react","es2015"] }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
};
