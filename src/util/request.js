import axios from 'axios'
import qs from 'qs'

/**
 * 网络请求
 * @param {any} method 请求方式 get,post,delete,put,patch
 * @param {any} url 接口地址
 * @param {any} [params={}] 接口参数
 * @param {any} config 其他配置
 * @returns Promise
 */
const request = (method, url, params = {}, config = {contentType: 'application/json'}) => {
  let headers = {
    'Content-Type': config.contentType
  }
  if (config.contentType !== 'application/json') {
    params = qs.stringify(params)
  }

  const reqConfig = {
    method: method,
    url: url,
    data: params,
    headers
  }

  return new Promise((resolve, reject) => {
    axios.request(reqConfig)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default request
