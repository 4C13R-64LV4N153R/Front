<script setup lang="ts">
import ProductBox from "@/components/ui/ProductBox.vue";
import {onMounted, ref} from "vue";
import {Product} from "@/types/product";
import MainLayout from "@/components/ui/MainLayout.vue";
import Box from "@/components/ui/Box.vue";
import {useApi} from "@/composition/api";
import {useRoute} from "vue-router";
import type {Order} from "@/types/order";
import {DeliveryState} from "@/types/deliveryState";
import type {Bar} from "@/types/bar";

const {getBar, updateBar, updateOrder, getOrderPendingByBarId} = useApi();
const route = useRoute();

const bar = ref<Bar>();
const barId = ref()
const order = ref<Order>()
const state = "inventoryManagement";

const updateProductQuantity = async (updatedProduct: Product) => {
  if (bar.value) {
    const index = bar.value?.stocks!.findIndex(product => product.produit_id === updatedProduct.produit_id);
    if (index !== -1) {
      bar.value!.stocks![index!] = {...updatedProduct};
    }
    await updateBar(bar.value, bar.value?.id)
  }
};

async function loadBar() {
  bar.value = await getBar(barId.value);
}
async function handleOrderConfirmation() {
  if (order.value && order.value.id) {
    order.value.statut = DeliveryState.DELIVERED;

    await updateOrder(order.value, order.value.id);
  }
}

async function loadOrder(){
  order.value = await getOrderPendingByBarId(barId.value);
}

onMounted(() => {
  barId.value = route.params.id as string;
  loadBar();
  loadOrder();
});
</script>

<template>
  <MainLayout :stateUser='state' :barID=" route.params.id as string">
    <div class="inventory-management">
      <Box class="orderStatus orange" v-if="order">
        <p>Livraison en cours</p>
        <div class="button" @click="handleOrderConfirmation">
          Reçue
        </div>
      </Box>
      <ProductBox
          v-if="bar"
          v-for="product in bar.stocks"
          :key="product.produit_id"
          :product="product"
          @updateQuantity="updateProductQuantity"
      />
    </div>
  </MainLayout>
</template>

<style lang="scss">
.inventory-management {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .box {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    align-items: center;

    .button {
      justify-content: space-between;
      background-color: white;
      border-radius: 20px;
      padding: 5px 10px;
      width: 100px;
      color: Black;
      text-align: center;
    }
  }
}
</style>
