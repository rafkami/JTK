const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  entry:
    // { index:
    "./src/js/script_main.js",
  // about: "./src/js/script_main.js",
  // offer: "./src/js/script_main.js",
  // media: "./src/js/script_main.js",
  // blog: "./src/js/script_main.js",
  // contact: "./src/js/script_main.js" },
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
      filename: "about.html",
      template: "src/about.html"
    }),
    new HtmlWebpackPlugin({
      filename: "offer.html",
      template: "src/offer.html"
    }),
    new HtmlWebpackPlugin({
      filename: "media.html",
      template: "src/media.html"
    }),
    new HtmlWebpackPlugin({
      filename: "blog.html",
      template: "src/blog.html"
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "src/contact.html"
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
