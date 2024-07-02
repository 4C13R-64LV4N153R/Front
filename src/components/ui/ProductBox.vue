<script setup lang="ts">
import type { Product } from "@/types/product";
import Box from "@/components/ui/Box.vue";
import { defineEmits } from 'vue';

const props = defineProps<{
  product: Product;
}>();

const emits = defineEmits(['updateQuantity']);

const add = (product: Product) => {
  if (product.quantity < product.maxQuantity) {
    product.quantity += 1;
    emits('updateQuantity', product);
  }
};

const subtract = (product: Product) => {
  if (product.quantity > 0) {
    product.quantity -= 1;
    emits('updateQuantity', product);
  }
};

const getClass = (product: any): string => {
  const percentage = (product.quantity / product.maxQuantity) * 100;
  if (percentage <= 20) {
    return 'red';
  } else if (percentage <= 50) {
    return 'orange';
  } else {
    return 'green';
  }
};
</script>

<template>
  <Box class="product-box" :class="getClass(product)">
    <p>{{ product.name }}</p>
    <div class="quantity-box">
      <button @click="subtract(product)">-</button>
      <span>{{ product.quantity }}</span>
      <button @click="add(product)">+</button>
    </div>
  </Box>
</template>

<style scoped lang="scss">
.product-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 20px;

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
</style>
