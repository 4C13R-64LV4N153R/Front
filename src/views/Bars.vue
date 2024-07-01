<script setup lang="ts">
import Box from '@/components/ui/Box.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const bars = ref<any[]>([
  {
    id: '1',
    name: 'Bar 1',
    produit: [
      { quantite: 10, quantiteMax: 20, nom: 'Produit A' },
      { quantite: 5, quantiteMax: 10, nom: 'Produit B' }
    ]
  },
  {
    id: '2',
    name: 'Bar 2',
    produit: [
      { quantite: 15, quantiteMax: 30, nom: 'Produit C' },
      { quantite: 10, quantiteMax: 20, nom: 'Produit D' }
    ]
  },
  {
    id: '3',
    name: 'Bar 3',
    produit: [
      { quantite: 0, quantiteMax: 5, nom: 'Produit E' },
      { quantite: 3, quantiteMax: 15, nom: 'Produit F' }
    ]
  },
  {
        id: '4',
    name: 'Bar 4',
    produit: [
      { quantite: 5, quantiteMax: 15, nom: 'Produit E' },
      { quantite: 5, quantiteMax: 15, nom: 'Produit F' }
    ]
  }
]);

const getClass = (produit: any[]): string => {
  for (const p of produit) {
    if (p.quantite <= 4) {
      return 'red';
    }else if (p.quantite < p.quantiteMax / 2) {
      return 'orange';
    } 
  }
  return 'green';
};

async function goToDetails(id: string) {
    await router.push({ name: 'inventory', params: { id } })
}
</script>


<template>
    <div class="bars">
      <Box
        v-for="bar in bars"
        :key="bar.name"
        :class="getClass(bar.produit)"
        @click="goToDetails(bar.id)"
      >{{ bar.name }}</Box>
    </div>
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
