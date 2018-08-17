process.env.NODE_ENV = 'development'

const webpackConfig = require('./webpack.config')
const config = require('../config')
const portfinder = require('portfinder')

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      webpackConfig.devServer.port = port
      resolve(webpackConfig)
    }
  })
})
