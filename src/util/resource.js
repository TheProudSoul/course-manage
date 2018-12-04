const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  req.body = JSON.parse(req.body)
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
  if (req.body.type == 0) {
    resource[0].res_name = '第一章课件.ppt'
    resource[1].res_name = '第二章课件.ppt'
  } else if (req.body.type == 1) {
    resource[0].res_name = '试卷一.doc'
    resource[1].res_name = '试卷一.doc'
  } else if (req.body.type == 3) {
    resource[0].res_name = '课外拓展阅读.pdf'
    resource[1].res_name = '推荐阅读.pdf'
  }
  return {
    resource
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/resource`, 'get', Data)
