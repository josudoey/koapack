var webpack = require("webpack");
var path = require("path");

var projectPath = path.resolve(__dirname, ".");
var contentBase = path.resolve(projectPath, "build");
var publicPath = "/assets/";

module.exports = {
  entry: {
    main: [projectPath + "/src/app/main.js"]
  },
  output: {
    path: path.resolve(contentBase, "assets"),
    publicPath: publicPath,
    filename: "[name].js"
  },
  resolve: {
    alias: {}
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: "raw!html-minify"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
      loader: "file-loader?name=[name].[ext]"
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({})
  ],
  devtool: 'source-map'
}

