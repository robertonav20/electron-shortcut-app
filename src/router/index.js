import Vue from 'vue'
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/ShortcutsView.vue')
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
