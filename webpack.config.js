const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const REGEX = {
  CSS: /\.css$/,
  CSS_MODULE: /\.module\.css$/,
  SASS: /\.(scss|sass)$/,
  SASS_MODULE: /\.module\.(scss|sass)$/,
};

const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');
const distDir = path.resolve(__dirname, 'dist');

const cssRule = ({ exclude, modules, sourceMap, test, mode }) => ({
  test,
  exclude,
  use: [
    // Creates `Style` Nodes from JS String => style-loader
    mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader', // Translates CSS into Commons JS
      options: {
        sourceMap: sourceMap || mode === 'development',
        modules: !!modules,
      },
    },
    {
      loader: 'sass-loader', // Compiles Sass to CSS
      options: {
        implementation: require('sass'), // dart-sass 적용
      },
    },
  ],
});

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    mode: mode === 'development' ? 'development' : 'production',
    entry: path.join(srcDir, 'index.ts'),
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', 'jsx'],
      alias: {
        '@': srcDir,
      },
    },
    output: {
      publicPath: '/',
      filename: '[hash].js',
      path: distDir,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        cssRule({ test: REGEX.CSS, exclude: REGEX.CSS_MODULE, mode }),
        cssRule({ test: REGEX.CSS_MODULE, modules: true, mode }),
        cssRule({ test: REGEX.SASS, exclude: REGEX.SASS_MODULE, mode }),
        cssRule({ test: REGEX.SASS_MODULE, modules: true, mode }),
      ],
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      compress: true,
      port: 9000,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv(),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(publicDir, 'index.html'),
        filename: 'index.html',
      }),
    ],
  };
};
