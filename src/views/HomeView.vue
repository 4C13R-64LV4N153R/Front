<script setup lang="ts">
import MainLayout from '@/components/ui/MainLayout.vue';
const state='noState';

</script>

<template>
  <MainLayout :stateUser='state'>
    <Home />

  </MainLayout>
</template>
