<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import MainButton from '@/components/ui/MainButton.vue';
import { Product } from '../types/product';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const barId = ref<string | null>(null);
const state='inventory';

onMounted(() => {
  barId.value = route.params.id as string;
});

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

const sortedProducts = computed(() => {
  return products.value.map(product => ({
    ...product,
    percentage: (product.quantity / product.maxQuantity) * 100
  })).sort((a, b) => a.quantity - b.quantity);
});

const getClass = (product: any): string => {
  const percentage = (product.quantity / product.maxQuantity) * 100;
  if (product.quantity <= 4) {
    return 'red';
  } else if (percentage <= 50) {
    return 'orange';
  } else {
    return 'green';
  }
};

async function goToOrder() {
  if (barId.value) {
    await router.push({ name: 'order', params: { id: barId.value } });
  }
}
</script>

<template>
  <MainLayout :stateUser='state'>
    <div class="inventory">
      <div v-for="product in sortedProducts" :key="product.name" class="product">
        <p>{{ product.name }}</p>
        <div class="fill-percentage">
          <div class="fill" :class="getClass(product)" :style="{ width: product.percentage + '%' }"></div>
          <p class="quantity">{{ product.quantity }}</p>
          <p class="max-quantity">{{ product.maxQuantity }}</p>
        </div>
      </div>
      <MainButton @click="goToOrder">Commander</MainButton>
    </div>
  </MainLayout>
</template>

<style lang="scss">

.inventory {
  .product {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      color: black;
      margin: 0 0 5px;
      width: 120px;
    }

    .fill-percentage {
      width: 100%;
      background-color: #d3d3d3;
      border-radius: 30px;
      height: 20px;
      position: relative;

      p {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: fit-content;
        color: white;
        font-size: 12px;
      }

      .quantity {
        left: 10px;
      }

      .max-quantity {
        right: 10px;
      }

      .fill {
        height: 100%;
        border-radius: 30px;
        transition: width 0.5s ease-in-out;

        &.red {
          background-color: $red;
        }

        &.orange {
          background-color: $orange;
        }

        &.green {
          background-color: $green;
        }
      }
    }
  }
}
</style>
