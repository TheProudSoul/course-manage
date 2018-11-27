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
      path: '/course',
      component: resolve => require(['../components/common/course.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/coursehome',
          component: resolve => require(['../components/page/CourseHome.vue'], resolve),
          meta: { title: '课程主页' }
        },
        {
          path: '/onlinetest',
          component: resolve => require(['../components/page/OnlineTest.vue'], resolve),
          meta: { title: '在线测试 ' }
        },
        {
          path: '/homework',
          component: resolve => require(['../components/page/Homework.vue'], resolve),
          meta: { title: '在线测试 ' }
        },
        {
          path: '/resource',
          component: resolve => require(['../components/page/Resource.vue'], resolve),
          meta: { title: ' 资源 ' }
        }
      ]
    },
    {
      path: '/home',
      component: resolve => require(['../components/page/StudentHome.vue'], resolve),
      meta: { title: '主页' }
    }
  ]
})
