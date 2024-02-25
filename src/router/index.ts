import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/posts',
      component: Posts,
      children: [
        {
          path: 'posts',
          name: 'posts',
          component: Posts
        },
        {
          path: 'posts/:id',
          name: 'post',
          component: () => import('../views/Post.vue')
        }
      ]
    }
  ]
})

export default router
