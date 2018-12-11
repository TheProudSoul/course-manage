import http from '../../util/request'

const state = {
  course: {}
}

const getters = {
  getCourse: state => state.course
}

const actions = {
  getData ({ state, commit }, course) {
    let data = {}
    http('get', '/section', { sec_id: course }).then(res => {
      data.course_name = res.data.course_name
      data.course_intro = res.data.course_intro
      data.course_credit = res.data.course_credit
      data.school = res.data.school
      data.section_week = res.data.section_week
      data.time_slot = res.data.time_slot
      data.building = res.data.building
      data.room = res.data.room
      data.teacher_id = res.data.teacher_id
      data.teacher_name = res.data.teacher_name
    })
    commit('setCourse', {
      item: data
    })
  }
}

const mutations = {
  setCourse (state, {item}) {
    state.course = item
    console.log(state.course)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
