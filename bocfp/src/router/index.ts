import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/child'
  },
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '/child',
        component: () => import('@/views/ChildPage.vue')
      },
      // {
      //   path: '/child',
      //   component: () => import('@/views/ChildPage.vue')
      // },
      // {
      //   path: '/child',
      //   component: () => import('@/views/ChildPage.vue')
      // },
    ]
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/RegisterPage.vue'),
  // },
    {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
