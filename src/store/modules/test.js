import http from '../../util/request'

const state = {
  submitList: [],
  submit: {}
}

const getters = {
  getSubmit: state => state.submit,
  getSubmitList: state => state.submitList
}

const actions = {
  fetchSubmit ({ state, commit }, id) {
    http('get', '/v1/test_submit/' + id).then(res => {
      let item = res.data
      if (item.mark == -1) {
        item.mark = ''
      }
      commit('setSubmit', {
        item: item
      })
    })
  },

  fetchSubmits ({ state, commit }, id) {
    // 真正路径 '/test_submit/'
    http('get', '/v1/test_submit/' + id).then(res => {
      commit('setSubmitList', {
        item: res.data.result
      })
    })
  }
}

const mutations = {
  setSubmit (state, {item}) {
    state.submit = item
  },

  setSubmitList (state, {item}) {
    state.submitList = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
