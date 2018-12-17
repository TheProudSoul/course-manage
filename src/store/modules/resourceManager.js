import http from '../../util/request'

const state = {
  resourceType: [{
    res_name: '课件',
    file_id: 'courseware',
    type_id: 0,
    leaf: false
  },
  {
    res_name: '试卷',
    type_id: 1,
    file_id: 'exam',
    leaf: false
  },
  {
    res_name: '实验资料',
    file_id: 'experiment',
    type_id: 2,
    leaf: false
  },
  {
    res_name: '参考资料',
    file_id: 'reference',
    type_id: 3,
    leaf: false
  }],
  resources: [[], [], [], []]
}

const getters = {
  getResourceType: state => state.resourceType,
  getResourceList: state => state.resources
}

const actions = {
  fetchResource ({state, commit}, course) {
    commit('setResources', [[], [], [], []])
    let tmp = []
    for (let i = 0; i < 4; i++) {
      http('get', '/currican/resource?res_type=' + i).then(res => {
        tmp[i] = res.data
        tmp[i].forEach(element => {
          element.leaf = true
        })
      })
    }
    commit('setResources', tmp)
  }
}

const mutations = {
  setResources (state, item) {
    state.resources = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
