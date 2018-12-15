const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  let online_test = [
    {
      'test_id': 1,
      'title': '第一次上机',
      'start_time': '2018-11-03 19:00:00',
      'end_time': '2018-11-03 21:00:00'
    },
    {
      'test_id': 2,
      'title': '第二次上机',
      'start_time': '2018-11-04 19:00:00',
      'end_time': '2018-11-04 21:00:00'
    }
  ]
  return {
    online_test
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/v1/online_test`, 'get', Data)
