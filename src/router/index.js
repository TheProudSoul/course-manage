import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/page/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/page/LoginPage.vue'], resolve),
      meta: { title: '登录' }
    },
    {
      path: '/frame',
      component: resolve => require(['../components/common/FramePage.vue'], resolve),
      meta: { title: '自述文件' },
      props: true,
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['../components/page/StudentHome.vue'], resolve),
          meta: { title: '主页' }
        },
        {
          path: '/ccourse',
          component: resolve => require(['../components/common/StudentCourseFrame.vue'], resolve),
          meta: { title: '自述文件' },
          children: [
            {
              path: '/course/:course',
              name: 'coursehome',
              component: resolve => require(['../components/page/StudentCourseHome.vue'], resolve),
              meta: { title: '课程主页' }
            },
            {
              path: '/course/:course/onlinetest',
              name: 'onlinetest',
              component: resolve => require(['../components/page/StudentOnlineTest.vue'], resolve),
              meta: { title: '在线测试 ' }
            },
            {
              path: '/course/:course/homework',
              name: 'homework',
              component: resolve => require(['../components/page/StudentAssignment.vue'], resolve),
              meta: { title: ' 作业 ' }
            },
            {
              path: '/course/:course/resource',
              name: 'resource',
              component: resolve => require(['../components/page/StudentResource.vue'], resolve),
              meta: { title: ' 资源 ' }
            },
            {
              path: '/course/:course/homework/:assign_id',
              name: 'assignment',
              component: resolve => require(['../components/page/StudentAssignmentInfo.vue'], resolve),
              meta: { title: '作业详情页' }
            },
            {
              path: '/course/:course/onlinetest/:test_id',
              name: 'onlinetestInfo',
              component: resolve => require(['../components/page/StudentOnlineTestInfo.vue'], resolve),
              meta: { title: '在线测试详情页' }
            }
          ]
        }

      ]
    }
  ]
})
