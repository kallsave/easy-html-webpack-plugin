import './stylus/style.styl';

// vendor
import * as _ from 'lodash';

import { canvasAnimFrame } from './js/canvas'

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));

let img = document.createElement('img');

let imgUrl = require('./assets/images/wallpaper.jpg');

img.setAttribute('src', imgUrl);

img.className = 'box';

let app = document.getElementById('app');

app.appendChild(img);

setTimeout(() => {
  img.style.width = '0px'
  img.style.opacity = '0'
  canvasAnimFrame();
}, 1000);
