<script setup lang="ts">
import { computed } from 'vue';
import { type Order } from '@/types/order';
import { DeliveryState } from '@/types/deliveryState';


type Props = {
  livraison: Order;
  onBoxClick: (livraison: Order) => void;
};

    const props = defineProps<Props>();

    const stateClass = computed(() => {
        switch (props.livraison.statut) {
            case DeliveryState.PENDING:
                return 'pending';
            case DeliveryState.IN_DELIVERY:
                return 'in-delivery';
            case DeliveryState.DELIVERED:
                return 'delivered';
            case DeliveryState.REFUSE:
                return 'refused';
            default:
                return '';
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
  <div :class="['boxx', stateClass]" @click="handleClick">
    <div class="box-content">
      <div class="box-row">
          <span>{{ livraison.bar }}</span>
        <span>{{ formattedDate }}</span>
      </div>
      <div class="box-row">
          <span>{{ livraison.stocks.name }}</span>
          <span>{{ livraison.stocks.quantity }}</span>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss">
  .boxx {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
    cursor: pointer;
  }

    .pending {
        background-color: $orange;
    }

    .in-delivery {
        background-color: $orange;
    }

    .delivered {
        background-color: $green;
    }

    .refused {
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
  