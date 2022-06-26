const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: "./App/App.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "index.html",
      filename: "[name].html",
    }),
  ],
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
      test: /\.(jpg|png|svg)/i,
      type: 'asset/resource'
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name][ext]'
        }
        }
    ],
  },
  resolve: {
    extensions: [".tsx", "jsx", ".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
    open: ['/main.html'],
    hot: true,
    watchFiles: ['./**/*.html', './**/*.js', './**/*.css'],
  }
};
