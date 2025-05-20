import { useAuth } from '@/composables/useAuth'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = () => import('../views/DashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home-view',
          component: DashboardView,
          meta: {
            requireAuth: true,
          },
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login-view',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register-view',
          component: RegisterView,
        },
      ],
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  const { auth } = useAuth()
  const isAuthenticated = !!auth.value.user

  if (!isAuthenticated && to.meta.requireAuth) {
    next({ name: 'login-view' })
  } else {
    next()
  }
})
