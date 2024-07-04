<script setup lang="ts">
import { Order } from '@/types/order';
import { ref, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import LivraisonBox from '@/components/ui/LivraisonBox.vue';
import {useApi} from "@/composition/api";
const {getOrders} = useApi()
const state='stock';
const orders = ref<Order[]>();

const handleBoxClick = (livraison: Order) => {
  console.log('Box clicked:', livraison);
};

async function loadOrders() {
  orders.value = await getOrders();
}

onMounted(() => {
  loadOrders()
});
</script>


<template>
  <MainLayout :stateUser='state'>
    <div class="stock-view">
      <LivraisonBox v-for="order in orders"
                    :key="order.id"
                    :livraison="order"
                    :onBoxClick="handleBoxClick" />
    </div>
  </MainLayout>
</template>


<style lang="scss">
.stock-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
