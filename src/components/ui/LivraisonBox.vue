<script setup lang="ts">
    import { computed } from 'vue';
    import {Livraison} from '@/types/livraison';

    type Props {
        livraison: Livraison;
        onBoxClick: (livraison: Livraison) => void;
    }

    const stateClass = computed(() => {
      switch (props.livraison.state) {
        case 'en_attente':
          return 'state-en-attente';
        case 'en_cours':
          return 'state-en-cours';
        case 'livree':
          return 'state-livree';
        default:
          return '';
      }
    });

    const props = defineProps<Props>();


    const formattedDate = computed(() => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return props.livraison.date_livraison.toLocaleDateString(undefined, options);
    });

    const handleClick = () => {
        props.onBoxClick(props.livraison);
    };
};

</script>


<template>
    <div :class="['box', stateClass]" @click="handleClick">
      <div class="box-content">
        <div class="box-row">
          <span>Nom du Bar: </span><span>{{ livraison.bar }}</span>
          <span>Date: </span><span>{{ formattedDate }}</span>
        </div>
        <div class="box-row">
          <span>Produit: </span><span>{{ livraison.product.name }}</span>
          <span>Quantité du produit: </span><span>{{ livraison.product.quantity }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .box {
    background-color: #ffcc66; /* Default color */
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
    cursor: pointer;
  }
  
  .state-en-attente {
    background-color: #ffcc66; /* Yellow */
  }
  
  .state-en-cours {
    background-color: #66ccff; /* Blue */
  }
  
  .state-livree {
    background-color: #66ff66; /* Green */
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
  