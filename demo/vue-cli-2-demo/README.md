# easy-html-webpack-plugin-vue-cli-demo

## Instructions for using

> In Vue-cli-2, [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) has more advantages for webpack-dev-server, this plugin was created to extend [html-webpack-plugin's]((https://github.com/jantimon/html-webpack-plugin)) injection capabilities In the production environment. In the development environment for Vue-cli, please use [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)


1.Install the plugin with npm:
------------
```shell
$ npm install --save-dev esay-html-webpack-plugin
```


2.Modify config/index.js to config your assetsPublicPath
------------
```javascript
dev: {
  ...
  // modify your dev assetsPublicPath
  assetsPublicPath: '/',
  ...
},
build: {
  ...
  // modify your build assetsPublicPath
  assetsPublicPath: './',
  ...
}
```

3.Modify build/webpack.prod.conf.js
------------
```javascript
/** require EsayHtmlWebpackPlugin*/
const EsayHtmlWebpackPlugin = require('easy-html-webpack-plugin')
...

/** remove filename hash */
output: {
  path: config.build.assetsRoot,
  filename: utils.assetsPath('js/[name].js'),
  chunkFilename: utils.assetsPath('js/[id].js')
},

plugins: [
/** remove HtmlWebpackPlugin*/
//   new HtmlWebpackPlugin({
//     filename: config.build.index,
//     template: 'index.html',
//     inject: true,
//     minify: {
//     removeComments: true,
//     collapseWhitespace: true,
//     removeAttributeQuotes: true
//     // more options:
//     // https://github.com/kangax/html-minifier#options-quick-reference
//     },
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency'
//   }),

  /** remove filename hash */
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].css'),
    allChunks: true,
  }),

  /** config EasyHtmlWebpackPlugin */
  new EsayHtmlWebpackPlugin({
    inject: true,
    filename: path.resolve(__dirname, '../dist/index.html'),
    template: path.resolve(__dirname, '../index.html'),
    hash: true,
    publicPath: config.build.assetsPublicPath
  }),
  ...
]

```

4.Npm run build
------------
```shell
$ npm run build
```
