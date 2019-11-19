const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  let baseConfig = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [path.resolve("src")],
          options: {
            formatter: require("eslint-friendly-formatter")
          }
        },
        {
          test: /\.jsx?$/,
          include: [path.resolve("src")],
          loader: "babel-loader",
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                /* your options here */
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|ico|jpeg)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "images/[name].[hash:8].[ext]" },
            },
          ],
        },
        {
          test: /\.(ogg|mp3)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "assets/[name].[hash:8].[ext]" },
            },
          ],
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "fonts/[name].[hash:8].[ext]" },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '&': path.resolve('src')
      },
      modules: [
        path.resolve("src"),
        path.resolve("."),
        "node_modules"
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
        moment: "moment",
        classnames: "classnames",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
        favicon: path.resolve(__dirname, '../src/favicon.ico'),
        inject: true
      }),
    ]
  }

  if (!env || !env.prod) {
    return merge(baseConfig, require("./webpack.config.develop"))
  }

  if (env && env.prod === "prod") {
    return merge(baseConfig, require("./webpack.config.production"))
  }

  if (env && env.prod === "read") {
    baseConfig.plugins = [new HtmlWebpackPlugin({
      filename: "changeLog.html",
      chunks: "readMe",
      template: "src/index.html",
      inject: true,
    })];

    return merge(baseConfig, require("./webpack.config.read"))
  }
}
