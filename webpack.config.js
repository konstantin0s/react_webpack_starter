const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src/public"),
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath);
}

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    devtool: isDevMode ? "source-map" : false,

    entry: __dirname + "/app/App.js",
    output: {
      path: path.resolve(__dirname, "/public"),
      filename: "bundle.js",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevMode,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")()],
                sourceMap: isDevMode,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets/",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: srcPathExtend("index.html"),
      }),
    ],
  };
};
