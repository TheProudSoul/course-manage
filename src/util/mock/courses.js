const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  let course = [
    {
      'course_id': 1,
      'course_name': '计算机网络'
    },
    {
      'course_id': 2,
      'course_name': '操作系统'
    }
  ]
  return course
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/admin/course/1`, 'get', Data)
