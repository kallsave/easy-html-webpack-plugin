import '@/common/stylus/index.styl'
import './stylus/style.styl'
import { TweenMax } from 'gsap/TweenMax'

TweenMax.fromTo('.element', 2, {x: 0}, {x: 100})
