const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  let course = [{
    'section_id': '1',
    'course_title': 'IT项目管理'
  },
  {
    'section_id': '2',
    'course_title': '软件架构'
  }
  ]
  return course
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/section`, 'get', Data)
