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
    {
      path: '/child_view/:id',
      component: () => import('@/views/ChildPage_View.vue'),
    },
    {
      path: '/child_edit/:id',
      component: () => import('@/views/ChildPage_Edit.vue'),
    },
    {
      path: '/child_add',
      component: () => import('@/views/ChildPage_Add.vue'),
    },
    {
      path: '/record_add/:id',
      component: () => import('@/views/RecordAdd.vue'),
    },

    // if wrong
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
