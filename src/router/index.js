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
        path: 'add',
        name: 'add',
        component: () => import('../views/ShortcutsView.vue')
      },
      {
        path: 'import',
        name: 'import',
        component: () => import('../views/ShortcutsView.vue')
      },
      {
        path: 'export',
        name: 'export',
        component: () => import('../views/ShortcutsView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
