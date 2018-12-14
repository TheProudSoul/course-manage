const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let result = [
    {
      'submit_id': 1,
      'student_no': '201630661234',
      'student_name': Random.cname(),
      'mark': Random.natural(60, 100)
    },
    {
      'submit_id': 2,
      'student_no': '201630661235',
      'student_name': Random.cname(),
      'mark': Random.natural(60, 100)
    }
  ]
  return {
    result
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/assign_submit\?ass_id=\/\d*/, 'get', Data)
