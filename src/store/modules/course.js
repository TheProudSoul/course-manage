import http from '../../util/request'

const state = {
  course: {}
}

const getters = {
  getCourse: state => state.course
}

const actions = {
  fetchCourse ({ state, commit }, course) {
    http('get', '/v1/section/' + course).then(res => {
      commit('setCourse', {
        item: res.data
      })
    })
  }
}

const mutations = {
  setCourse (state, {item}) {
    state.course = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
