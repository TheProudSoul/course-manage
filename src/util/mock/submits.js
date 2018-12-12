const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let result = [
    {
      'submit_id': 1,
      'student_no': '201630661234',
      'student_name': '张殷齐',
      'mark': 97
    },
    {
      'submit_id': 2,
      'student_no': '201630661235',
      'student_name': '连木名',
      'mark': 66
    }
  ]
  return {
    result
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/assign_submits/1`, 'get', Data)
