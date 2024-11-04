import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/ui/HomeView.vue'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/ui/LoginPage.vue'),
    },
  ],
})
router.beforeEach(authGuard)
export { router }
