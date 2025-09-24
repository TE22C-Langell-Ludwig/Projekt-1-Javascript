import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Wares from '../components/Wares.vue'

const routes = [
  { path: '/Login', component: Login },
  { path: '/Register', component: Register },
  { path: '/Wares', component: Wares }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
