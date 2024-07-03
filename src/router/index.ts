import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Bars from '@/views/Bars.vue'
import Inventory from '@/views/Inventory.vue'
import Login from '@/views/Login.vue'
<<<<<<< HEAD
import Order from '@/views/Order.vue'
import InventoryManagement from '@/views/InventoryManagement.vue'
import Home from '@/views/Home.vue'
=======
>>>>>>> 77799de192c8185854813fb8695af89be335b266

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
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
