const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  let notice = [
    {
      'notice_id': 1,
      'title': Random.cparagraph(1),
      'content': Random.cparagraph(3),
      'release_time': '2018-11-03 12:00:00',
      'teacher_name': Random.cname()
    },
    {
      'notice_id': 2,
      'title': Random.cparagraph(1),
      'content': Random.cparagraph(3),
      'release_time': '2018-12-15 10:19:00',
      'teacher_name': Random.cname()
    }
  ]
  return notice
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/currican\/notice\?all=\/\d*/, 'get', Data)
