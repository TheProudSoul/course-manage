const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  console.log(req.body) // 请求体，用于获取参数
  let course_id = ''
  let course_name = ''
  let teacher_name = ''
  console.log('req.body.sec_id', req.body.sec_id)
  if (req.body.sec_id == 1) {
    course_id = '1'
    course_name = 'IT项目管理'
    teacher_name = '李红'
  } else {
    course_id = '2'
    course_name = '软件架构'
    teacher_name = '杨磊'
  }

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
  let building = 'A2'
  let room = '302'
  let teacher_id = '100010'

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
Mock.mock(`${domain}/section/1`, 'get', Data)
