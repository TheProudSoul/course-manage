import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import sidebar from './modules/sidebar'
import course from './modules/course'
import notice from './modules/notice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    sidebar,
    course,
    notice
  }
})
