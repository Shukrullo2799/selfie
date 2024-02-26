import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Posts.vue')
    },
    {
      path: '/post/:id',
      name: 'ViewPost',
      component: () => import('@/views/View.vue')
    }
  ]
})

export default router
