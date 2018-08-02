Easy HTML Webpack Plugin
========================================

Add a JavaScript or CSS asset to the HTML generate

[![npm](https://img.shields.io/npm/v/easy-html-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/easy-html-webpack-plugin) 

Features
------------

Does not produce a different hash suffix js or css files each time after webpack compilation

But can dependen on [webpack.HashedModuleIdsPlugin](https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js) to keep module.id stable when vendor modules does not change

After webpack compilation:
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Document</title>
  <link rel="stylesheet" href="./static/css/app.css?fe8f1871392175ffe592" /></head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body><script src="./static/js/manifest.js?8031c6b28b40ad59a31e"></script><script src="./static/js/vendor.js?bd0ae558bdc3f0975439"></script><script src="./static/js/app.js?fe8f1871392175ffe592"></script>
</html>
```

Installation
------------
You must be running webpack2 or higher

Install the plugin with npm:
```shell

$ npm install --save-dev esay-html-webpack-plugin
```
Basic Usage
-----------
Require the plugin in your webpack config:

```javascript
const EsayHtmlWebpackPlugin = require('esay-html-webpack-plugin');
```

Add the plugin to your webpack config as follows:
[Project structure](https://github.com/kallsave/easy-html-webpack-plugin/tree/master/demo/simple-demo) please look at [follow dome](https://github.com/kallsave/easy-html-webpack-plugin/tree/master/demo/simple-demo) or vue-cli 2:

[simple-demo](https://github.com/kallsave/easy-html-webpack-plugin/tree/master/demo/simple-demo)

```javascript
plugins: [
  ...
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks (module) {
        return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
            path.join(__dirname, '../node_modules')
        ) === 0
        )
    }
    }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
    }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    async: 'vendor-async',
    children: true,
    minChunks: 3
    }),
  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),
  new EsayHtmlWebpackPlugin({
    inject: true,
    // filename absolute path
    filename: path.resolve(__dirname, '../dist/index.html'),
    // template absolute path
    template: path.resolve(__dirname, '../index.html'),
    // add hash to chunkFile and keep hash stable when vendor modules does not change
    hash: true,
    // Prefix of injected file
    public: './',
    chunkPipe(chunkFile) {
      // if chunk is app, do some special processing
      if (chunkFile.indexOf('app') !== -1) {
        return './' + chunkFile
      }
      return chunkFile
    }
  }),
]  
```

When you want to change some special chunkfiles'path, you can use  chunkPipe methods:
```javascript
plugins: [
  ...
  new EsayHtmlWebpackPlugin({
    inject: true,
    // filename absolute path
    filename: path.resolve(__dirname, '../dist/index.html'),
    // template absolute path
    template: path.resolve(__dirname, '../index.html'),
    // add hash to chunkFile and keep hash stable when vendor modules does not change
    hash: true,
    // Prefix of injected file
    public: './',
    chunkPipe(chunkFile) {
      // if chunk is app, do some special processing
      if (chunkFile.indexOf('app') !== -1) {
        return './' + chunkFile
      }
      return chunkFile
    }
  }),
]  
```


