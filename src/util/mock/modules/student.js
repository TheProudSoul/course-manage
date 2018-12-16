const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random

const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  let course = [
    {
      'id': '201630666666',
      'name': Random.cname(),
      'school': '软件学院',
      'major': '软件工程',
      'grade': '2016',
      'class': '4'
    },
    {
      'id': '201630661234',
      'name': Random.cname(),
      'school': '软件学院',
      'major': '软件工程',
      'grade': '2016',
      'class': '4'
    }
  ]
  return course
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/account\/student\/\d*/, 'get', Data)
