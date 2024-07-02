<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '@/components/header/MainLayout.vue';
import Box from '@/components/ui/Box.vue';
import { Product } from '../types/product';



const products = ref<Product[]>([
  { name: 'Product A', quantity: 5, maxQuantity: 20 },
  { name: 'Product B', quantity: 15, maxQuantity: 20 },
  { name: 'Product C', quantity: 8, maxQuantity: 10 },
  { name: 'Product D', quantity: 2, maxQuantity: 5 },
  { name: 'Product E', quantity: 7, maxQuantity: 20 },
  { name: 'Product F', quantity: 1, maxQuantity: 2 },
  { name: 'Product G', quantity: 12, maxQuantity: 15 },
  { name: 'Product H', quantity: 0, maxQuantity: 10 },
  { name: 'Product I', quantity: 6, maxQuantity: 25 },
  { name: 'Product J', quantity: 18, maxQuantity: 30 }
]);

const incrementQuantity = (product: Product) => {
  if (product.quantity < product.maxQuantity) {
    product.quantity += 1;
  }
};

const decrementQuantity = (product: Product) => {
  if (product.quantity > 0) {
    product.quantity -= 1;
  }
};

const getQuantityClass = (product: Product) => {
  const percentage = (product.quantity / product.maxQuantity) * 100;
  if (percentage <= 25) {
    return 'red';
  } else if (percentage <= 50) {
    return 'orange';
  } else {
    return 'green';
  }
};
</script>

<template>
    <MainLayout>
      <div class="order">
        <Box v-for="product in products" :key="product.name" :class="getQuantityClass(product)">
          <div class="product-box">
            <p>{{ product.name }}</p>
            <div class="quantity-box">
              <button @click="decrementQuantity(product)">-</button>
              <span>{{ product.quantity }}</span>
              <button @click="incrementQuantity(product)">+</button>
            </div>
          </div>
        </Box>
    </div>
    </MainLayout>
    </template>
    
    <style lang="scss">
    .order {
        display: flex;
  flex-direction: column;
  gap: 15px;

    .box {
        padding: 10px 10px 10px 20px;
    }

      .product-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        p {
            margin: 0;
        }

        .quantity-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: white;
          border-radius: 20px;
          padding: 5px 10px;
          width: 100px;
    
          button {
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: black;
    
            &:hover {
              background-color: #2c8b6b;
            }
          }
    
          span {
            width: 30px;
            text-align: center;
            color: black;
          }
        }
      }
    }
</style>
    