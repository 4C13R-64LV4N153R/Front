import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Bars from '@/views/Bars.vue'
import Inventory from '@/views/Inventory.vue'
import Order from '@/views/Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, 
    {
      path: '/bars',
      name: 'bars',
      component: Bars
    },
    {
      path: '/inventory/:id',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '/order/:id',
      name: 'order',
      component: Order
    }
  ]
})

export default router
