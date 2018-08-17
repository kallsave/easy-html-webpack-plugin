module.exports = {
  dev: {
    publicPath: '/',
    useEslint: true,
    buildDirector: 'pages/canvas',
    host: 'localhost',
    port: '8080',
    proxy: {}
  },
  build: {
    publicPath: './',
    buildDirectors: ['pages/canvas'],
  }
}
