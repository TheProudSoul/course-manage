const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let resource = [
    {
      'res_id': 1,
      'res_name': '第一次实验.pdf',
      'res_type': '实验',
      'upload_time': '2018-11-03',
      'file_size': 20.9,
      'downloads': 20,
      'file_id': 3
    },
    {
      'res_id': 2,
      'res_name': '第二次实验.pdf',
      'res_type': '实验',
      'upload_time': '2018-11-09',
      'file_size': 21.5,
      'downloads': 20,
      'file_id': 5
    }
  ]
  return {
    resource
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/resource`, 'get', Data)
