const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  entry: "./src/js/script_main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "video/",
              publicPath: "video/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "o_mnie.html",
      template: "src/o_mnie.html"
    }),
    new HtmlWebpackPlugin({
      filename: "oferta.html",
      template: "src/oferta.html"
    }),
    new HtmlWebpackPlugin({
      filename: "media.html",
      template: "src/media.html"
    }),
    new HtmlWebpackPlugin({
      filename: "kontakt.html",
      template: "src/kontakt.html"
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: "src/404.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      template: "src/css/style.css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "public")
  },
  devtool: "source-map"
};
