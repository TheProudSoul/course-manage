import http from '../../util/request'

const state = {
  noticeList: []
}

const getters = {
  getNotices: state => state.noticeList
}

const actions = {

  fetchNotice ({ state, commit }, course) {
    commit('setNoticeList', {
      item: []
    })
    http('get', '/currican/notice?all=' + course).then(res => {
      commit('setNoticeList', {
        item: res.data
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
