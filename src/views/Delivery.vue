<script setup lang="ts">
    import { type Livraison } from '@/types/livraison';
    import { type Utilisateur } from '@/types/utilisateur';
    import { ref } from 'vue';
    import MainLayout from '@/components/ui/MainLayout.vue';
    import LivraisonBox from '@/components/ui/LivraisonBox.vue';


    const state='delivery';
    const utilisateur = ref<Utilisateur>({utilisateur_id: 1 , nom: "Pascal",type:"Livreur"});
    const livraisons = ref<Livraison[]>([
        { livraison_id: 1, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'en-attente',date_livraison: new Date() },
        { livraison_id: 2, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'en-attente' ,date_livraison: new Date()},
        { livraison_id: 3, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: 'en-attente' ,date_livraison: new Date() },
    ]);

    const handleBoxClick = (livraison: Livraison) => {
        console.log('Box clicked:', livraison);
    };

</script>


<template>
    <MainLayout :stateUser='state'>
        <div>
            <LivraisonBox v-for="livraison in livraisons"
                 :key="livraison.livraison_id"
                 :livraison="livraison"
                 :onBoxClick="handleBoxClick" />
        </div>
    </MainLayout>
</template>


<style lang="scss">

</style>
