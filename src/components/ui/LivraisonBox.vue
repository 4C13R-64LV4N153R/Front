<script setup lang="ts">
import { computed } from 'vue';
import { type Order } from '@/types/order';

type Props = {
  livraison: Order;
  onBoxClick: (livraison: Order) => void;
};

const props = defineProps<Props>();

const stateClass = computed(() => {
  switch (props.livraison.statut) {
    case 'en_attente':
      return 'en_attente';
    case 'en_cours':
      return 'en_cours';
    case 'terminer':
      return 'terminer';
    case 'refus':
      return 'refus';
    default:
      return 'en_attente';
  }
});

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return props.livraison.order_date.toLocaleDateString(undefined, options);
});

const handleClick = () => {
  props.onBoxClick(props.livraison);
};
</script>


<template>
  <div :class="['box', stateClass]" @click="handleClick">
    <div class="box-content">
      <div class="box-row">
        <span>{{ livraison.bar_id }}</span>
        <span>{{ formattedDate }}</span>
      </div>
      <div class="box-row">
        <span>{{ livraison.stocks.nom }}</span>
        <span>{{ livraison.stocks.quantite }}</span>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss">
  .box {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
    cursor: pointer;
  }
  
  .en_attente {
    background-color: $orange; 
  }
  
  .en_cours {
    background-color: $orange; 
  }
  
  .terminer {
    background-color: $green; 
  }

  .refus {
    background-color: $red;
  }
  
  .box-content {
    display: flex;
    flex-direction: column;
  }
  
  .box-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
</style>
  