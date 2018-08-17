1.npm install:
------------
```shell
$ npm install
```

2.Modify config/index.js to config your project
------------
```javascript
dev: {
  ...
  // String, The directories you want to pack this time
  buildDirector: 'pages/canvas',
  // your proxy
  proxy: {}
  ...
},
build: {
  // Array, The directories you want to pack this time
  buildDirectors: ['pages/canvas', 'pages/tween'],
}
```

3.npm run dev:
------------
```shell
$ npm run dev
```

4.npm run build:
------------
```shell
$ npm run build
