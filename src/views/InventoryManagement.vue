<script setup lang="ts">
import ProductBox from "@/components/ui/ProductBox.vue";
import {onMounted, ref} from "vue";
import {Product} from "@/types/product";
import MainLayout from "@/components/ui/MainLayout.vue";
import Box from "@/components/ui/Box.vue";

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

const barHasOrder = ref(false)
const state = "inventoryManagement";
const updateProductQuantity = (updatedProduct: Product) => {
  // call api
  const index = products.value.findIndex(product => product.name === updatedProduct.name);
  if (index !== -1) {
    products.value[index] = { ...updatedProduct };
  }
};

async function handleOrderConfirmation() {
  // api call
}

onMounted(() => {
  // api call to set product and productHasOrder
});
</script>

<template>
  <MainLayout :stateUser='state'>
    <div class="inventory-management">
      <Box class="orderStatus orange" v-if="barHasOrder">
        <p>livraison en cours</p>
        <div class="button" @click="handleOrderConfirmation">
          Livrer
        </div>
      </Box>
      <ProductBox
          v-for="product in products"
          :key="product.name"
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
