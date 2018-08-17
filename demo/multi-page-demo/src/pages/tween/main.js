import { getDiscList } from '@/api/recommend.js'

console.log(1)

console.log(process.env.baseURL)

getDiscList({
  platform: 'yqq',
  hostUin: 0,
  sin: 0,
  ein: 29,
  sortId: 5,
  needNewCode: 0,
  categoryId: 10000000,
  rnd: Math.random(),
  format: 'json'
}).then((res) => {
  console.log(res)
})
