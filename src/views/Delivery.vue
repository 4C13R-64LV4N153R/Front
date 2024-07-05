<script setup lang="ts">
import { type Order, type OrderChangeStatut } from '@/types/order';
import { type User } from '@/types/user';
import { ref, onMounted } from 'vue';
import MainLayout from '@/components/ui/MainLayout.vue';
import LivraisonBox from '@/components/ui/LivraisonBox.vue';
import {useApi} from "@/composition/api";
import { DeliveryState } from '@/types/deliveryState';

const {getOrderPending,updateUserWithUserId,getMe} = useApi()
const state='delivery';
const orders = ref<Order[]>();
const userConnected = ref<User>();

async function handleBoxClick  (livraison: Order) {
  if(livraison.statut == DeliveryState.PENDING && livraison.id && userConnected.value){
    const valueChange: OrderChangeStatut =  { statut: DeliveryState.IN_DELIVERY, utilisateur_id: userConnected.value.id };
    await updateUserWithUserId(livraison.id.toString(),valueChange);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
};

async function loadOrders() {
  orders.value = await getOrderPending();
}

async function loadUser() {
  userConnected.value = await getMe();
  console.log(userConnected);
}

onMounted(() => {
  loadOrders();
  loadUser();
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
