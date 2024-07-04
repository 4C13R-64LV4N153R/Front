<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import ProductBox from "@/components/ui/ProductBox.vue";
import type {Product} from "@/types/product";
import MainButton from "@/components/ui/MainButton.vue";
import {Order} from "@/types/order";
import {DeliveryState} from "@/types/deliveryState";
import {useApi} from "@/composition/api";
import {useRoute} from "vue-router";
const {getOrderProposal, createOrder} = useApi();
const route = useRoute();


const state='order';
const products = ref<Product[]>([
  { nom: 'Product A', quantity: 5, maxQuantity: 20 },
  { nom: 'Product B', quantity: 15, maxQuantity: 20 },
  { nom: 'Product C', quantity: 8, maxQuantity: 10 },
  { nom: 'Product D', quantity: 2, maxQuantity: 5 },
  { nom: 'Product E', quantity: 7, maxQuantity: 20 },
  { nom: 'Product F', quantity: 1, maxQuantity: 2 },
  { nom: 'Product G', quantity: 12, maxQuantity: 15 },
  { nom: 'Product H', quantity: 0, maxQuantity: 10 },
  { nom: 'Product I', quantity: 6, maxQuantity: 25 },
  { nom: 'Product J', quantity: 18, maxQuantity: 30 }
]);
const barId = ref()

const updateProductQuantity = (updatedProduct: Product) => {
  const index = products.value.findIndex(product => product.nom === updatedProduct.nom);
  if (index !== -1) {
    products.value[index] = { ...updatedProduct };
  }
};

async function loadOrderProposal() {
  const bar = await getOrderProposal(barId.value);
  products.value = bar.stocks;
}

async function handleOrderConfirmation() {
  const order: Order = {
    utilisateur_id: "todo",
    bar_id: barId.value,
    stocks: products.value,
    statut: DeliveryState.PENDING,
  }

  await createOrder(order);
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
          v-for="product in products"
          :key="product.nom"
          :product="product"
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
