const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  return {
    'status': 0,
    'error_msg': '提交失败'
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/(assign_submit|test_submit|notice)/, 'post', Data)
