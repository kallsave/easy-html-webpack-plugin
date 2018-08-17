'use strict'
const path = require('path')
const webpack = require('webpack')
const EasyHtmlWebpackPlugin = require('easy-html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const utils = require('./utils')
const HOST = utils.getIPAddress()

const assetsSubDirectory = 'static'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath(_path) {
  return path.posix.join(assetsSubDirectory, _path)
}

const createLintingRule = () => ({
  test: /\.(js)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  entry: {
    app: resolve('src/main.js'),
  },
  output: {
    path: resolve('dist'),
    filename: assetsPath('js/[name].js'),
  },
  resolve: {
    extensions: ['.js', ' '],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint && process.env.NODE_ENV === 'development' ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.styl$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
          },
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'stylus-loader',
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
          },
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextWebpackPlugin({
      filename: assetsPath('css/[name].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    new EasyHtmlWebpackPlugin({
      inject: true,
      // filename absolute path
      filename: path.resolve(__dirname, '../dist/index.html'),
      // template absolute path
      template: path.resolve(__dirname, '../index.html'),
      // add hash to chunkFile and keep hash stable when vendor modules does not change
      hash: true,
      // Prefix of injected file
      publicPath: process.env.NODE_ENV === 'development' ? config.dev.publicPath : config.build.publicPath,
      // You can manipulate each injected file here
      chunkPipe(chunkFile) {
        if (chunkFile.indexOf('vendor') !== -1) {
          return chunkFile
        } else {
          // change the hash suffix of the chunkfile to a timestamp
          let time = new Date()
          let year = time.getFullYear()
          let month = time.getMonth() + 1
          month = month > 9 ? month : `0${month}`
          let date = time.getDate()
          date = date > 9 ? date : `0${date}`
          return chunkFile.replace(/(\?.*)/, `?${year}${month}${date}`)
        }
      }
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    contentBase: resolve('dist'),
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: config.dev.port,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true,
    watchOptions: {
      poll: false,
    }
  },
}
