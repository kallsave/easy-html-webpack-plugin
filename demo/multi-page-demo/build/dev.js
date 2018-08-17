process.env.NODE_ENV = 'development'

const webpackConfigFn = require('./webpack.config')
const config = require('../config')
const portfinder = require('portfinder')

// The directory to be developed this time
let buildDirector = config.dev.buildDirector

let webpackConfig = webpackConfigFn(buildDirector)

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
