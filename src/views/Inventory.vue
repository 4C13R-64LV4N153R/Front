<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import MainButton from '@/components/ui/MainButton.vue';
import { Product } from '@/types/product';
import { useRouter, useRoute } from 'vue-router';
import {useApi} from "@/composition/api";

const {getBar} = useApi();
const router = useRouter();
const route = useRoute();
const barId = ref<string>();
const state='inventory';

onMounted(() => {
  barId.value = route.params.id as string;
  loadBar()
});

const products = ref<Product[]>();

const sortedProducts = computed(() => {
  if (products.value) {
    return products.value!.map(product => ({
      ...product,
      percentage: (product.quantite / product.quantite_max) * 100
    })).sort((a, b) => a.quantite - b.quantite);
  }
});

const getClass = (product: any): string => {
  const percentage = (product.quantite / product.quantite_max) * 100;
  if (product.quantite <= 4) {
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

async function loadBar() {
  if (barId.value) {
    const bar = await getBar(barId.value);
    products.value = bar.stocks;
  }
}

</script>

<template>
  <MainLayout :stateUser='state'>
    <div class="inventory">
      <div v-for="product in sortedProducts" :key="product.produit.id" class="product">
<!--        <img :src="product.produit.img_url"/>-->
        <p>{{ product.produit.nom }}</p>
        <div class="fill-percentage">
          <div class="fill" :class="getClass(product)" :style="{ width: product.percentage + '%' }"></div>
          <p class="quantity">{{ product.quantite }}</p>
          <p class="max-quantity">{{ product.quantite_max }}</p>
        </div>
      </div>
      <MainButton @click="goToOrder">Commander</MainButton>
    </div>
  </MainLayout>
</template>

<style lang="scss">
.inventory {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .product {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      color: black;
      margin: 0 0 5px;
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
