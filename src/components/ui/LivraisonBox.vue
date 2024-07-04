<script setup lang="ts">
import { computed } from 'vue';
import { type Order } from '@/types/order';
import { DeliveryState } from '@/types/deliveryState';
import Box from "@/components/ui/Box.vue";
import {useApi} from "@/composition/api";

type Props = {
  livraison: Order;
  onBoxClick: (livraison: Order) => void;
};

    const props = defineProps<Props>();

    const stateClass = computed(() => {
        switch (props.livraison.statut) {
            case DeliveryState.PENDING:
                return 'orange';
            case DeliveryState.IN_DELIVERY:
                return 'orange';
            case DeliveryState.DELIVERED:
                return 'green';
            case DeliveryState.REFUSE:
                return 'red';
            default:
                return '';
        }
    });

const formattedDate = computed(() => {
  const dateString = props.livraison.date_livraison;
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
});

const handleClick = () => {
  props.onBoxClick(props.livraison);
};
</script>


<template>
  <Box :class="[stateClass]" @click="handleClick">
    <div class="box-content">
      <div class="box-row">
          <span>{{ livraison.bar.nom }}</span>
        <span>{{ formattedDate }}</span>
      </div>
    </div>
  </Box>
</template>
  
<style lang="scss">

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
  