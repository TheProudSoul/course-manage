import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import sidebar from './modules/sidebar'
import course from './modules/course'
import notice from './modules/notice'
import admin from './modules/admin'
import assignment from './modules/assignment'
import test from './modules/test'
import resource from './modules/resource'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    sidebar,
    course,
    notice,
    admin,
    assignment,
    test,
    resource
  }
})
