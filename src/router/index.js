import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        name: 'default',
        component: () => import('../views/ShortcutsView.vue')
      },
      {
        path: 'shortcuts',
        name: 'shortcuts',
        component: () => import('../views/ShortcutsView.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/SettingsView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
