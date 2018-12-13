const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let result = {
    'submit_id': 1,
    'test_title': '第一次上机考试',
    'student_no': '201630661234',
    'student_name': '张殷齐',
    'content': 'Vue 的计算属性（Computed Property）可以配置双向的访问器（Getter / Setter），我们可以利用其建立起 Vuex 状态库和本地组件间的桥梁。其中一个限制在于计算属性无法支持嵌套属性（table.table_name），因此我们需要为这些属性设置别名。',
    'mark': 98,
    'file_flag': 0
  }
  return result
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/assign_submit/1`, 'get', Data)
