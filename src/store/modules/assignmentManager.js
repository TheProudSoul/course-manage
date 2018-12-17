import http from '../../util/request'

const state = {
  submitList: [],
  submit: {},
  assignment: {},
  assignmentList: []
}

const getters = {
  getSubmit: state => state.submit,
  getSubmitList: state => state.submitList,
  getAssignment: state => state.assignment,
  getAssignmentList: state => state.assignmentList
}

const actions = {
  fetchSubmit ({ state, commit }, id) {
    commit('setSubmit', {
      item: {}
    })
    http('get', '/currican/assign_submit/' + id).then(res => {
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
    http('get', '/currican/assign_submit?ass_id=' + id).then(res => {
      commit('setSubmitList', {
        item: res.data
      })
    })
  },

  fetchAssignment ({ state, commit }, id) {
    commit('setAssignment', {
      item: {}
    })
    http('get', '/currican/assignment/' + id).then(res => {
      commit('setAssignment', {
        item: res.data
      })
    })
  },

  fetchAssignmentList ({ state, commit }) {
    commit('setAssignmentList', {
      item: []
    })
    http('get', '/currican/assignment').then(res => {
      commit('setAssignmentList', {
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

  setAssignment (state, {item}) {
    state.assignment = item
  },

  setAssignmentList (state, {item}) {
    state.assignmentList = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
