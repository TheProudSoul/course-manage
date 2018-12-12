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
    http('get', '/assign_submit/' + id).then(res => {
      commit('setSubmit', {
        item: res.data
      })
    })
  },

  fetchSubmits ({ state, commit }, id) {
    http('get', '/assign_submits/' + id).then(res => {
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
