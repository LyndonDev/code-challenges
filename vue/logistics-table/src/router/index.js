import Vue from 'vue'
import VueRouter from 'vue-router'
import Shipments from '../views/Shipments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Shipments
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
