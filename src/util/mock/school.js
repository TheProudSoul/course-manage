const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  let school = [{
    'school_id': 1,
    'school_name': '软件学院'
  },
  {
    'school_id': 2,
    'school_name': '环境学院'
  }
  ]

  return school
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/admin/school`, 'get', Data)
