const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

// 随机生成文章数据
const LoginData = req => {
  console.log(req) // 请求体，用于获取参数
  let status = 0
  let notice = [{
    'notice_id': 1,
    'release_time': '2018-11-03 12:00',
    'title': '11月6号晚上要写完API文档'
  },
  {
    'notice_id': 2,
    'release_time': '2018-11-03 12:00',
    'title': '啊，已经7号了......'
  }
  ]
  let course = [
    {
      'section_id': 1,
      'course_title': 'IT项目管理'
    },
    {
      'section_id': 2,
      'course_title': '软件架构'
    }
  ]
  let error_msg = ''

  // 返回状态码和文章数据posts
  return {
    status,
    notice,
    course,
    error_msg
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/login`, 'post', LoginData)
