import p5 from '././i1.png'
import p6 from '././i2.png'
import p7 from '././i3.png'
import p8 from '././i4.png'
import p9 from '././i5.png'



const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let notice = [
    {
      'notice_id': '1',
      'release_time': '2018-11-03 12:00',
      'title': '11月6号晚上要写完API文档',
      'img':p5
    },
    {
      'notice_id': '2',
      'release_time': '2018-11-03 12:00',
      'title': '啊，已经7号了......',
      'img':p6
    },
    {
      'notice_id': '3',
      'release_time': '2018-11-03 12:00',
      'title': '啊，已经8号了......',
      'img':p7
    },
    {
      'notice_id': '4',
      'release_time': '2018-11-03 12:00',
      'title': '啊，已经9号了......',
      'img':p8
    },
    {
      'notice_id': '5',
      'release_time': '2018-11-03 12:00',
      'title': '啊，已经10号了......',
      'img':p9
    }
  ]
  return {
    notice
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/notice`, 'get', Data)
