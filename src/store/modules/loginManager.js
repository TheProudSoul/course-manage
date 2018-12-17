const state = {
  role: ''
}

const getters = {
  isTeacher: (state) => {
    return state.role === 'teacher'
  },

  isStudent: (state) => {
    return state.role === 'student'
  },

  isAdmin: (state) => {
    return state.role === 'admin'
  },

  isLogout: (state) => {
    return state.role === ''
  }
}

const actions = {

}

const mutations = {
  userType (state, type) {
    state.role = type
    localStorage.setItem('role', type)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
