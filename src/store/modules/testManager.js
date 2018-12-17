import http from '../../util/request'

const state = {
  submitList: [],
  submit: {},
  test: {},
  testList: []
}

const getters = {
  getSubmit: state => state.submit,
  getSubmitList: state => state.submitList,
  getTest: state => state.test,
  getTestList: state => state.testList
}

const actions = {
  fetchSubmit ({ state, commit }, id) {
    http('get', '/currican/test_submit/' + id).then(res => {
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
    http('get', '/currican/test_submit?test_id=' + id).then(res => {
      commit('setSubmitList', {
        item: res.data.result
      })
    })
  },

  fetchTest ({ state, commit }, id) {
    http('get', '/currican/online_test/' + id).then(res => {
      commit('setTest', {
        item: res.data
      })
    })
  },

  fetchTestList ({ state, commit }) {
    http('get', '/currican/online_test').then(res => {
      commit('setTestList', {
        item: res.data
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
  },
  setTest (state, {item}) {
    state.test = item
  },

  setTestList (state, {item}) {
    state.testList = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
