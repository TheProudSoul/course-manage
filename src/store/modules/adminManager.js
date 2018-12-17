import http from '../../util/request'
import _ from 'lodash'

const state = {
  schoolList: [],
  courseList: [],
  userList: [],
  userInfo: [],
  courseInfo: [],
  teacherList: []
}

const getters = {
  getCourseList: state => state.courseList,
  getTeacherList: state => state.teacherList,
  getCourseInfo: state => state.courseInfo
}

const actions = {
  fetchSchool ({ state, commit }) {
    let data = []

    http('get', '/currican/admin/school').then(res => {
      res.data.forEach(element => {
        data.push({
          id: element.school_id,
          name: element.school_name
        })
      })
      commit('setSchoolList', {
        item: data
      })
    })
  },

  fetchCourse ({ state, commit }, school) {
    http('get', '/currican/admin/course/' + school).then(res => {
      commit('setCourseList', {
        item: res.data
      })
    })
  },

  fetchUser ({ state, commit }, {type, school}) {
    http('get', '/currican/account/' + type + '/' + school).then(res => {
      commit('setUserList', {
        item: res.data
      })
    })
  },

  initUserInfo ({ state, commit }, type) {
    let tmp
    if (type =='student') {
      tmp = {
        id: '',
        name: '',
        school_id: '',
        major: '',
        grade: '',
        class: ''
      }
    } else {
      tmp = {
        id: '',
        name: '',
        school_id: ''
      }
    }
    commit('setUserInfo', tmp)
  },

  fetchCourseList ({ state, commit }, school_id) {
  },
  fetchTeacherList ({ state, commit }, school_id) {
  }
}

const mutations = {
  setSchoolList (state, {item}) {
    state.schoolList = item
  },

  setCourseList (state, {item}) {
    state.courseList = item
  },

  setUserList (state, {item}) {
    state.userList = item
  },

  setUserInfo (state, item) {
    state.userInfo = item
  },

  updateUser (state, payload) {
    const { path, value } = payload
    _.set(state, path, value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
