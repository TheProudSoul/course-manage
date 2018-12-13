import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/page/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/LoginPage.vue'], resolve),
      meta: { title: '登录' }
    },
    {
      path: '/frame',
      component: resolve => require(['../components/common/FramePage.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      props: true,
      children: [{
        path: '/home',
        name: 'home',
        component: resolve => require(['../components/page/Home.vue'], resolve),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/coursemgt',
        name: 'courseMgt',
        component: resolve => require(['../components/page/CourseMgt.vue'], resolve),
        meta: {title: '管理课程'}
      },
      {
        path: '/usermgt/:type',
        name: 'userMgt',
        component: resolve => require(['../components/page/UserMgt.vue'], resolve),
        meta: {title: '管理用户'}
      },
      {
        path: '/course/set',
        name: 'setCourse',
        component: resolve => require(['../components/page/SetCourse.vue'], resolve),
        meta: {title: '设置课程'}
      },
      {
        path: '/ccourse',
        component: resolve => require(['../components/common/CourseFrame.vue'], resolve),
        meta: {title: '自述文件'},
        children: [{
          path: '/course/:course',
          name: 'coursehome',
          component: resolve => require(['../components/page/CourseHome.vue'], resolve),
          meta: {
            title: '课程主页'
          }
        },
        {
          path: '/course/:course/onlinetest',
          name: 'onlinetest',
          component: resolve => require(['../components/page/OnlineTest.vue'], resolve),
          meta: { title: '在线测试' }
        },
        {
          path: '/course/:course/assignment',
          name: 'assignment',
          component: resolve => require(['../components/page/Assignment.vue'], resolve),
          meta: {
            title: ' 作业 '
          }
        },
        {
          path: '/course/:course/resource',
          name: 'resource',
          component: resolve => require(['../components/page/Resource.vue'], resolve),
          meta: { title: ' 资源 ' }
        },
        {
          path: '/course/:course/assignment/set',
          name: 'setAssignment',
          component: resolve => require(['../components/page/SetAssignment.vue'], resolve),
          meta: { title: '设置作业' }
        },
        {
          path: '/course/:course/assignment/:assign_id',
          name: 'assignmentInfo',
          component: resolve => require(['../components/page/AssignmentInfo.vue'], resolve),
          meta: { title: '作业详情页' }
        },
        {
          path: '/course/:course/assignment/:assign_id/submit',
          name: 'assignmentSubmits',
          component: resolve => require(['../components/page/AssignmentSubmits.vue'], resolve),
          meta: {
            title: '作业提交列表'
          }
        },
        {
          path: '/course/:course/assignment/:assign_id/submit/:submit_id',
          name: 'assignmentSubmit',
          component: resolve => require(['../components/page/AssignmentSubmit.vue'], resolve),
          meta: {
            title: '作业提交详情'
          }
        },
        {
          path: '/course/:course/onlinetest/set',
          name: 'setOnlinetest',
          component: resolve => require(['../components/page/SetOnlineTest.vue'], resolve),
          meta: {
            title: '设置在线测试'
          }
        },
        {
          path: '/course/:course/onlinetest/:test_id',
          name: 'onlinetestInfo',
          component: resolve => require(['../components/page/OnlineTestInfo.vue'], resolve),
          meta: {
            title: '在线测试详情页'
          }
        },
        {
          path: '/course/:course/onlinetest/:test_id/submit',
          name: 'testSubmits',
          component: resolve => require(['../components/page/OnlineTestSubmits.vue'], resolve),
          meta: {title: '在线测试提交列表'}
        },
        {
          path: '/course/:course/onlinetest/:test_id/submit/:submit_id',
          name: 'testSubmit',
          component: resolve => require(['../components/page/OnlineTestSubmit.vue'], resolve),
          meta: {title: '在线测试提交详情'}
        }]
      }]
    }]
})
