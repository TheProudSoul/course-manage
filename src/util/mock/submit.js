const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let result = {
    'submit_id': 1,
    'test_title': '第一次上机测试',
    'student_no': '201630661234',
    'student_name': '张殷齐',
    'content': '答案....',
    'time': '2018-06-01 18:00',
    'mark': 98,
    'file_id': 1
  }
  return result
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/assign_submit/1`, 'get', Data)
