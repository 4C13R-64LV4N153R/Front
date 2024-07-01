<script setup lang="ts">
import Home from '../components/Home.vue'
import Header from '@/components/header/Header.vue';
</script>

<template>
  <main>
      <Header>
          <Home />
          <Box class="red">
              test
          </Box>
      </Header>
  </main>
</template>
