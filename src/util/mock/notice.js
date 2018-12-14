const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let notice = [
    {
      'notice_id': '1',
      'release_time': '2018-11-03 12:00',
      'title': Random.cparagraph(1)
    },
    {
      'notice_id': '2',
      'release_time': '2018-11-03 12:00',
      'title': Random.cparagraph(1)
    }
  ]
  return notice
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/notice\/\d*/, 'get', Data)
