import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
  {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
  },
  {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: 'About' */ '../components/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router