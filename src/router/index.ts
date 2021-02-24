import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: 'Home' */ '../views/home/index.vue'),
        meta: {
          title: '主页-后台管理模板',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: 'About' */ '../views/about/index.vue'),
        meta: {
          title: '关于-后台管理模板',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import(
            /* webpackChunkName: 'Profile' */ '../views/profile/index.vue'
          ),
        meta: {
          title: '个人中心-后台管理模板',
        },
      },
      {
        path: 'data',
        name: 'Data',
        component: () =>
          import(/* webpackChunkName: 'Data' */ '../views/data/index.vue'),
        meta: {
          title: '数据-后台管理模板',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'Login' */ '../views/login/index.vue'),
  },
  {
    path: '/',
    redirect: (_) => {
      return { path: '/home' }
    },
  },
  // {
  //   path: '*',
  //   redirect: _ => {
  //     return { path: '/home' }
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
