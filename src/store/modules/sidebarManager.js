import http from '../../util/request'

const state = {
  sidebarItems: []
}

const getters = {
  getSidebarItems: state => state.sidebarItems
}

const actions = {
  getData ({ state, commit, rootState }) {
    let data = []
    if (rootState.login.role === 'admin') {
      data = [{
        id: '',
        name: '课程',
        icon: 'fa fa-book fa-2x',
        path: '/coursemgt'
      }, {
        id: 'student',
        name: '学生用户',
        icon: 'fa fa-graduation-cap fa-2x',
        path: '/usermgt'
      }, {
        id: 'teacher',
        name: '教师用户',
        icon: 'fa fa-user fa-2x',
        path: '/usermgt'
      }]
    } else {
      http('get', '/currican/section').then(res => {
        res.data.forEach(element => {
          data.push({
            id: element.section_id,
            name: element.course_name,
            icon: 'fa fa-book fa-2x',
            path: '/course'
          })
        })
      })
    }
    commit('setSidebarItems', {
      items: data
    })
  }
}

const mutations = {
  setSidebarItems (state, {items}) {
    state.sidebarItems = items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
