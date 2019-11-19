const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyFilePlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const flexbugs = require("postcss-flexbugs-fixes");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {theme,} = require("./util");
const path = require("path");
const outputDir = path.resolve("dist");
const browerVision = ["last 6 versions", "android >= 4.0", "ios >= 5.0", ">1%", "Firefox ESR", "not ie < 9"];

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: outputDir,
    filename: "./js/[name].[chunkhash:8].js",
    chunkFilename: "./js/[name].[chunkhash:8].js",
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                flexbugs,
                autoprefixer({
                  browsers: browerVision
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve("./node_modules"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                flexbugs,
                autoprefixer({
                  browsers: browerVision
                })
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: theme
            }
          },
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve("./src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                flexbugs,
                autoprefixer({
                  browsers: browerVision
                })
              ]
            }
          },
          {
            loader: "less-loader",
          }
        ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name][chunkhash:8].css",
      chunkFilename: "css/[name][chunkhash:8].css"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    }),
    new CopyFilePlugin([{
      from: path.join(__dirname, '../server'),
      to: outputDir+"/server"
    }]),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve("./"),
    })
  ]
}
