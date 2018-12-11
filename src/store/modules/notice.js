import http from '../../util/request'

const state = {
  noticeList: {}
}

const getters = {
  getCourse: state => state.noticeList
}

const actions = {
  getCourseNotice ({ state, commit }, course) {
    http('get', '/notice', { sec_id: course }).then(res => {
      commit('setNoticeList', {
        item: res.data.notice
      })
    })
  },

  getNotice ({ state, commit }) {
    http('get', '/notice').then(res => {
      commit('setNoticeList', {
        item: res.data.notice
      })
    })
  }
}

const mutations = {
  setNoticeList (state, {item}) {
    state.noticeList = item
    // console.log(state.course)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
