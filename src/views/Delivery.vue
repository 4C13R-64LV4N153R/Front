<script setup lang="ts">
    import { StateDelivery, type Livraison } from '@/types/livraison';
    import type { Utilisateur } from '@/types/utilisateur';
    import { ref } from 'vue';
    import MainLayout from '@/components/ui/MainLayout.vue';
    import LivraisonBox from '@/components/ui/LivraisonBox.vue';



    const utilisateur = ref<Utilisateur>({utilisateur_id: 1 , nom: "Pascal",type:"Livreur"});
    const livraisons = ref<Livraison[]>([
        { livraison_id: 1, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: StateDelivery.en_attente,date_livraison: new Date() },
        { livraison_id: 2, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: StateDelivery.en_attente ,terminer: new Date()},
        { livraison_id: 3, user: utilisateur.value, bar: "bar 2",product:{ name: 'Product B', quantity: 15, maxQuantity: 20 },state: StateDelivery.en_attente,en_cours_de_livraison: new Date() },
    ]);

    const handleBoxClick = (livraison) => {
        console.log('Box clicked:', livraison);
        // Ajouter changement de page pour créer livraison
    };

</script>


<template>
    <MainLayout>
        <div class="deliveries">
            <LivraisonBox v-for="livraison in livraisons"
                 :key="livraison.livraison_id"
                 :livraison="livraison"
                 :onBoxClick="handleBoxClick" />
        </div>
    </MainLayout>
</template>


<style lang="scss">

</style>
