const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random

const Data = req => {
  req.body = JSON.parse(req.body)
  let resource = [[{
    'res_name': '1第一章课件.ppt',
    'file_id': 1
  },
  {
    'res_name': '2第二章课件.ppt',
    'file_id': 2
  }], [{
    'res_name': '3试卷一.doc',
    'file_id': 3
  },
  {
    'res_name': '4试卷二.doc',
    'file_id': 4
  }], [{
    'res_name': '5第一次实验.pdf',
    'file_id': 5
  },
  {
    'res_name': '6第二次实验.pdf',
    'file_id': 6
  }], [{
    'res_name': '7课外拓展阅读.pdf',
    'file_id': 7
  },
  {
    'res_name': '8推荐阅读.pdf',
    'file_id': 8
  }]]

  let n = Random.natural(0, 3)
  return resource[n]
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/api\/v1\/resource\/\d*/, 'get', Data)
