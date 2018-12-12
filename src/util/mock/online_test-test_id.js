const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  console.log(req.body) // 请求体，用于获取参数
  let test_id = 1
  let title = '第一次上机'
  let content = '上机内容：...'
  let start_time = '2018-11-08 17:00'
  let end_time = '2018-11-08 18:00'
  let file_id = 1
  let file_name = '上机要求.docx'
  return {
    test_id,
    title,
    content,
    start_time,
    end_time,
    file_id,
    file_name
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/online_test/1`, 'get', Data)
