import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '/child',
        component: () => import('@/views/ChildPage.vue')
      },
      {
        path: '/guardian',
        component: () => import('@/views/GuardPage.vue'),
      },
      {
        path: '/dashboard',
        component: () => import('@/views/DashboardPage.vue'),
      },
      {
        path: '/record_view/:id',
        component: () => import('@/views/Record_View.vue'),
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
        component: () => import('@/views/Record_Add.vue'),
      },
      {
        path: '/record_edit/:id',
        component: () => import('@/views/Record_Edit.vue'),
      },
      {
        path: '/guardian_add',
        component: () => import('@/views/GuardPage_Add.vue'),
      },
      {
        path: '/guardian_profile/:id',
        component: () => import('@/views/GuardPage_View.vue'),
      },
      {
        path: '/guardian_edit/:id',
        component: () => import('@/views/GuardPage_Edit.vue'),
      },
      {
        path: '/link_add/:id',
        component: () => import('@/views/Link_Add.vue'),
      },
    ]
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
