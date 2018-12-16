const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  let assignment = [{
    'assign_id': 1,
    'title': '第一次作业',
    'release_time': '2018-11-03 12:00',
    'deadline': '2018-11-07 12:00',
    'file_id': 3
  },
  {
    'assign_id': 2,
    'title': '第二次作业',
    'release_time': '2018-11-03 17:47',
    'deadline': '2018-11-07 12:00',
    'file_id': 2
  }
  ]
  return assignment
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/v1/assignment`, 'get', Data)
