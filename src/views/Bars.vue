<script setup lang="ts">
import Box from '@/components/ui/Box.vue';
import MainLayout from '@/components/ui/MainLayout.vue';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from "@/composition/api";

const {getBars} = useApi()
const router = useRouter();

const state = "bars";
const bars = ref<any[]>();

const getClass = (products: any[]): string => {
  for (const p of products) {
    if (p.quantite <= 4) {
      return 'red';
    }
  }
  for (const p of products) {
    if (p.quantite < (p.quantite_max / 2)) {
      return 'orange';
    }
  }
  return 'green';
};

async function goToDetails(id: string) {
  await router.push({ name: 'inventory', params: { id } })
}

async function loadBar() {
  const test = await getBars();
  console.log(test)
  bars.value = await getBars();
}

onMounted(() => {
  loadBar()
});

</script>


<template>
  <MainLayout :stateUser='state'>
    <div class="bars">
      <Box
          v-for="bar in bars"
          :key="bar.nom"
          :class="getClass(bar.stocks)"
          @click="goToDetails(bar.id)"
      >{{ bar.nom }}</Box>
    </div>
  </MainLayout>
</template>

<style lang="scss">
.bars{
  display: flex;
  flex-direction: column;
  gap: 20px;

  .box {
    text-align: center;
  }
}
</style>
