const path = require("path");
const webpack = require("webpack");
const {merge} = require("webpack-merge");
const baseConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const config = (argv) => {
  const hash = `[hash:7]`;
  let buildHash = hash;
  let buildTimestamp = Number(new Date());
  let commitSHA = hash;

  if (argv.env) {
    buildHash = "BUILD_HASH" in argv.env ? argv.env.BUILD_HASH : hash;
    buildTimestamp = "BUILD_TIMESTAMP" in argv.env ? argv.env.BUILD_TIMESTAMP : buildTimestamp;
    commitSHA = "COMMIT_SHA" in argv.env ? argv.env.COMMIT_SHA : hash;
  }

  const envKeys = {
    NODE_ENV: JSON.stringify(`production`),
    BACK_ENV: JSON.stringify(`production`),
    BUILD_HASH: JSON.stringify(buildHash),
    BUILD_TIMESTAMP: JSON.stringify(buildTimestamp),
    COMMIT_SHA: JSON.stringify(commitSHA),
  };

  return {
    mode: "production",
    output: {
      path: path.join(__dirname, "prod"),
      filename: `bundle-${buildHash}.js`,
      publicPath: "",
    },
    plugins: [
      new webpack.DefinePlugin(
        {
          "process.env": envKeys,
        }
      ),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        {
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          },
          template: path.join(__dirname, "src", "index.html"),
        },
      ),
      new MiniCssExtractPlugin(
        {
          filename: `main-${buildHash}.css`,
        },
      ),
    ],
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader", // translates CSS into CommonJS modules
            },
            {
              loader: "postcss-loader", // Run postcss actions
              options: {
                plugins: [require("autoprefixer")],
              },
            },
            {
              loader: "less-loader", // compiles Sass to CSS
              options: {
                sourceMap: true,
                lessOptions: {
                  javascriptEnabled: true,
                }
              }
            },
          ]
        },
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(
          {
            exclude: /node_modules/,
            parallel: true,
            sourceMap: false,
            extractComments: false,
            terserOptions: {
              output: {
                comments: false,
              }
            }
          }
        ),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  }
};

module.exports = (env, argv) => {
  return merge(baseConfig(), config(argv));
};
