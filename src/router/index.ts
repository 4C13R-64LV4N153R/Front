import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Bars from '@/views/Bars.vue'
import Inventory from '@/views/Inventory.vue'
import Order from '@/views/Order.vue'
import Delivery from '@/views/Delivery.vue'
import StockView from '@/views/StockView.vue'
import InventoryManagement from "@/views/InventoryManagement.vue";
import Home from "@/views/Home.vue";

const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/inventory-management/:id',
      name: 'inventory-management',
      component: InventoryManagement
    },
    {
      path: '/order/:id',
      name: 'order',
      component: Order
    },
    {
        path: '/delivery',
        name: 'delivery',
        component: Delivery
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView
  }
  ]
})

export default router
