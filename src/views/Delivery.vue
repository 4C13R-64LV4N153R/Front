<script setup lang="ts">
import { type Order } from '@/types/order';
import { type User } from '@/types/user';
import { ref, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import LivraisonBox from '@/components/ui/LivraisonBox.vue';
import {useApi} from "@/composition/api";
import { DeliveryState } from '@/types/deliveryState';

const {getOrderPending} = useApi()
const state='delivery';
const orders = ref<Order[]>();

const handleBoxClick = (livraison: Order) => {
  console.log('Box clicked:', livraison);
};

async function loadOrders() {
  orders.value = await getOrderPending();
}

onMounted(() => {
  loadOrders()
});

</script>


<template>
  <MainLayout :stateUser='state'>
    <div class="livraison-box">
      <LivraisonBox v-for="livraison in orders"
                    :key="livraison.id"
                    :livraison="livraison"
                    :onBoxClick="handleBoxClick" />
    </div>
  </MainLayout>
</template>


<style lang="scss">
.livraison-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
