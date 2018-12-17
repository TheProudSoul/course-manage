import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/loginManager'
import sidebar from './modules/sidebarManager'
import course from './modules/courseManager'
import notice from './modules/noticeManager'
import admin from './modules/adminManager'
import assignment from './modules/assignmentManager'
import test from './modules/testManager'
import resource from './modules/resourceManager'

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
