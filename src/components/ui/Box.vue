<script setup lang="ts"></script>

<template>
  <div class="box">
    <slot />
  </div>
</template>

<style lang="scss">
.box {
  border-radius: 15px;
  box-shadow: 0px 8px 21px 6px rgba(0, 0, 0, 0.3);
}
</style>
