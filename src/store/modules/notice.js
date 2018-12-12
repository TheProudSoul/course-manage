import http from '../../util/request'

const state = {
  noticeList: {}
}

const getters = {
  getCourse: state => state.noticeList
}

const actions = {
  fetchNotice ({ state, commit }, course) {
    http('get', '/notice/' + course).then(res => {
      commit('setNoticeList', {
        item: res.data.notice
      })
    })
  }
}

const mutations = {
  setNoticeList (state, {item}) {
    state.noticeList = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
