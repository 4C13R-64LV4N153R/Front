<script setup lang="ts">
import { computed } from 'vue';
import { type Order } from '@/types/order';

type Props = {
  livraison: Order;
  onBoxClick: (livraison: Order) => void;
};

const props = defineProps<Props>();


const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return props.livraison.order_date.toLocaleDateString(undefined, options);
});

const handleClick = () => {
  props.onBoxClick(props.livraison);
};
</script>


<template>
  <div :class="['box', props.livraison.state]" @click="handleClick">
    <div class="box-content">
      <div class="box-row">
        <span>{{ livraison.bar }}</span>
        <span>{{ formattedDate }}</span>
      </div>
      <div class="box-row">
        <span>{{ livraison.product.name }}</span>
        <span>{{ livraison.product.quantity }}</span>
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
  