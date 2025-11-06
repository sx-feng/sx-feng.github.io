import { createRouter, createWebHistory } from 'vue-router'

import MyProfile from '@/pages/MyProfile.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/profile', component: MyProfile },
  {
  path: '/post',
  component: () => import('@/pages/PostDetail.vue')
},
  {
    path: '/page',
    component: () => import('@/pages/PagePage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
