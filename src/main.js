// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import LoginMock from './util/login_mock'
import section from './util/section'
import notice from './util/notice'
import homework from './util/assignment'
import online_test from './util/online_test'
import test from './util/online_test-test_id'
import ass from './util/assignment-ass_id'
import resource from './util/resource'
import axios from 'axios'
import request from './util/request'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.BASE_URL
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
Vue.prototype.$http = request

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
