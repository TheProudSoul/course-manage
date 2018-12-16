const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  console.log(req.body) // 请求体，用于获取参数
  let assign_id = 1
  let title = '第一章作业'
  let content = Random.cparagraph(1, 3)
  let release_time = '2018-11-08 12:00'
  let deadline = '2018-11-08 14:00'
  let file_id = 1
  let file_name = '第一章作业.docx'
  return {
    assign_id,
    title,
    content,
    release_time,
    deadline,
    file_id,
    file_name
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/assignment\/\d/, 'get', Data)
