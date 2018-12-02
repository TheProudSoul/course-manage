import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/page/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/page/Login.vue'], resolve),
      meta: { title: '登录' }
    },
    {
      path: '/chome',
      component: resolve => require(['../components/common/Chome.vue'], resolve),
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
          component: resolve => require(['../components/common/Ccourse.vue'], resolve),
          meta: { title: '自述文件' },
          children: [
            {
              path: '/course/:course',
              name: 'coursehome',
              component: resolve => require(['../components/page/CourseHome.vue'], resolve),
              meta: { title: '课程主页' }
            },
            {
              path: '/course/:course/onlinetest',
              name: 'onlinetest',
              component: resolve => require(['../components/page/OnlineTest.vue'], resolve),
              meta: { title: '在线测试 ' }
            },
            {
              path: '/course/:course/homework',
              name: 'homework',
              component: resolve => require(['../components/page/Homework.vue'], resolve),
              meta: { title: ' 作业 ' }
            },
            {
              path: '/course/:course/resource',
              name: 'resource',
              component: resolve => require(['../components/page/Resource.vue'], resolve),
              meta: { title: ' 资源 ' }
            }
          ]
        }

      ]
    }
  ]
})
