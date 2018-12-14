const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
  let status = 0
  let error_msg = '课程删除失败'
  return {status, error_msg}
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/v1/admin/course`, 'post', Data)
