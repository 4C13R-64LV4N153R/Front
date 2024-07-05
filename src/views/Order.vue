<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import ProductBox from "@/components/ui/ProductBox.vue";
import type {Product} from "@/types/product";
import MainButton from "@/components/ui/MainButton.vue";
import {useApi} from "@/composition/api";
    import { useRoute } from "vue-router";
    import router from '@/router';

import type {Bar} from "@/types/bar";
const {getOrderProposal, createOrder} = useApi();
const route = useRoute();


const state='order';
const stocks = ref<any[]>();
const barId = ref()

const updateProductQuantity = async (updatedProduct: any) => {
  if (stocks.value!) {
    const index = stocks.value!.findIndex(product => product.produit.id === updatedProduct.produit.id);
    if (index !== -1) {
      stocks.value![index!] = {...updatedProduct};
    }
  }
};

async function loadOrderProposal() {
  const bar = await getOrderProposal(barId.value);
  stocks.value = bar.proposal;
}

async function handleOrderConfirmation() {
  const order: Bar = {
    id: barId.value,
    stocks: stocks.value!,
  }

    await createOrder(order);
    setTimeout(() => {
        router.push({name: 'stock'})
    }, 500);
}

onMounted(() => {
  barId.value = route.params.id as string;
  loadOrderProposal()
});
</script>

<template>
  <MainLayout :stateUser='state' :barID="barId?.value">
    <div class="order">
      <ProductBox
          v-for="stock in stocks"
          :key="stock.produit?.nom"
          :product="stock"
          @updateQuantity="updateProductQuantity"
      />
    </div>
    <MainButton @click="handleOrderConfirmation">Valider</MainButton>
  </MainLayout>
</template>

<style lang="scss">
.order {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
