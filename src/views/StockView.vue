<script setup lang="ts">
    import { type Order } from '@/types/order';
    import { type User } from '@/types/user';
    import { ref } from 'vue';
    import MainLayout from '@/components/ui/MainLayout.vue';
    import LivraisonBox from '@/components/ui/LivraisonBox.vue';


    const state='stock';
    const utilisateur = ref<User>({user_id: 1 , nom: "Pascal",type:"Livreur"});
    const livraisons = ref<Order[]>([
        { order_id: 1, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'en-attente',order_date: new Date() },
        { order_id: 2, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'en_cours' ,order_date: new Date()},
        { order_id: 3, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'terminer' ,order_date: new Date() },
    ]);

    const handleBoxClick = (livraison: Order) => {
        console.log('Box clicked:', livraison);
    };

</script>


<template>
    <MainLayout :stateUser='state'>
        <div>
            <LivraisonBox v-for="livraison in livraisons"
                 :key="livraison.order_id"
                 :livraison="livraison"
                 :onBoxClick="handleBoxClick" />
        </div>
    </MainLayout>
</template>


<style lang="scss">

</style>
