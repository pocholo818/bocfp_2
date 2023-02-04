import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// import HomePage from '@/views/HomePage.vue'

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
    component: () => import('@/views/HomePage.vue'),
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
        path: '/announcement',
        component: () => import('@/views/AnnouncementPage.vue'),
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
      {
        path: '/link_edit/:id',
        component: () => import('@/views/Link_Edit.vue'),
      },
      {
        path: '/user',
        component: () => import('@/views/UserPage.vue')
      },
      {
        path: '/user/profile/:id',
        component: () => import('@/views/UserPage_View.vue')
      },
      {
        path: '/user/edit/:id',
        component: () => import('@/views/UserPage_Edit.vue')
      },
      {
        path: '/user/edit/password/:id',
        component: () => import('@/views/UserPage_Password.vue')
      },
      {
        path: '/user/add',
        component: () => import('@/views/UserPage_Add.vue')
      }
    ]
  },
  // if wrong
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const user_fname = localStorage.getItem('fname') as string
  const admin_power = localStorage.getItem('admin_power') as string

  if (!user_fname && to.path !== '/login') {
    // redirect the user to the login page
    return { path: '/login' }
  }

  if (to.fullPath.includes('user') && admin_power !== '1') {
    return { path: '/' }
  }
})

export default router
