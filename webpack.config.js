const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV !== "development";

const optimize = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),

  watchOptions: {
    ignored: /node_modules/,
  },

  entry: {
    index: ["./js/index.js"],
  },

  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "public"),
  },

  devServer: {
    writeToDisk: true,
    disableHostCheck: true,
    clientLogLevel: "silent",
    historyApiFallback: true,
    inline: false,
    liveReload: false,
    noInfo: false,
    stats: {
      preset: "minimal",
      all: false,
      colors: true,
      timings: true,
      errors: true,
      warnings: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp|mov|ttf|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },

  optimization: optimize(),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js"],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "./",
        },
      ],
    }),
  ],
};
