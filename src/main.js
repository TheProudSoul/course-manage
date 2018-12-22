// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import axios from 'axios'
import request from './util/request'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.timeout = 50000
axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.withCredentials = true
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

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')
  if (role == '' && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  // 储存登录状态
  created () {
    if (localStorage.getItem('role') === null) {
      localStorage.setItem('role', '')
    }
    this.$store.commit('login/userType', localStorage.getItem('role'))
  }
})
