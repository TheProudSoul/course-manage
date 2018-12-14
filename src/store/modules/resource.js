import http from '../../util/request'

const state = {
  resourceType: [{
    res_name: '课件',
    file_id: 'courseware',
    leaf: false
  },
  {
    res_name: '试卷',
    file_id: 'exam',
    leaf: false
  },
  {
    res_name: '实验资料',
    file_id: 'experiment',
    leaf: false
  },
  {
    res_name: '参考资料',
    file_id: 'reference',
    leaf: false
  }],
  resources: [[], [], [], []]
}

const getters = {
  getResourceType: state => state.resourceType,
  getResourceList: state => state.resources,
  getResourceByType: (state) => (type) => {
    return state.resources[type].map(resource => resource.file_id)
  },
  getTypeName: state => {
    return state.resourceType.map(resource => resource.file_id)
  }
}

const actions = {
  fetchResource ({state, commit}, course) {
    let tmp = []
    for (let i = 0; i < 4; i++) {
      http('get', '/v1/resource/' + i).then(res => {
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
