const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  console.log(req.body) // 请求体，用于获取参数
  let course = [{
    'section_id': '1',
    'course_title': 'IT项目管理'
  },
  {
    'section_id': '2',
    'course_title': '软件架构'
  }
  ]
  if (!req.body.sec_id) {
    return course
  }
  let course_id = '1'
  let course_name = 'IT项目管理'
  let course_intro = 'balabala'
  let course_credit = 3
  let school = '软件学院'
  let section_week = [2, 3, 4, 5, 6, 7]
  let time_slot = [{
    'week_day': 1,
    'period': [1, 2],
    'start_time': '8:50',
    'end_time': '10:25'
  },
  {
    'week_day': 2,
    'period': [3, 4],
    'start_time': '10:40',
    'end_time': '12:15'
  }
  ]
  let building = 'A1'
  let room = '101'
  let teacher_id = '100010'
  let teacher_name = '冯玉祥'

  // 返回状态码和文章数据posts
  return {
    course_id,
    course_name,
    course_intro,
    course_credit,
    school,
    section_week,
    time_slot,
    building,
    room,
    teacher_id,
    teacher_name
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/section`, 'get', Data)
