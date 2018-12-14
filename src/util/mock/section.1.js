const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  let course = [
    {
      'section_id': 1,
      'course_name': 'IT项目管理'
    },
    {
      'section_id': 2,
      'course_name': '软件架构'
    },
    {
      'section_id': 3,
      'course_name': '数据结构'
    },
    {
      'section_id': 4,
      'course_name': '数据库'
    },
    {
      'section_id': 5,
      'course_name': '机器学习'
    }
  ]
  return course
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/v1/section`, 'get', Data)
