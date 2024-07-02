<script setup lang="ts">
</script>

<template>
  <div class="main-button">
    <slot />
  </div>
</template>

<style lang="scss">
.main-button {
  border-radius: 25px;
  background-color: black;
  color: white;
  padding: 10px 50px;
  width: fit-content;
  margin: 30px auto
}
</style>
