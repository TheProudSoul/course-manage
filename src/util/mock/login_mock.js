const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const LoginData = req => {
  console.log(req) // 请求体，用于获取参数
  let status = 0
  
  let error_msg = ''

  return {
    status,
    error_msg
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/v1/login`, 'post', LoginData)
