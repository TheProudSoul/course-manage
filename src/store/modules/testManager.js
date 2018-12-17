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
    commit('setSubmit', {
      item: {}
    })
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
    commit('setSubmitList', {
      item: []
    })
    // 真正路径 '/test_submit/'
    http('get', '/currican/test_submit?test_id=' + id).then(res => {
      commit('setSubmitList', {
        item: res.data
      })
    })
  },

  fetchTest ({ state, commit }, id) {
    commit('setTest', {
      item: {}
    })
    http('get', '/currican/online_test/' + id).then(res => {
      commit('setTest', {
        item: res.data
      })
    })
  },

  fetchTestList ({ state, commit }) {
    commit('setTestList', {
      item: []
    })
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
  },

  update (state, payload) {
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
