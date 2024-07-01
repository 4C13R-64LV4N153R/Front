<script setup lang="ts"></script>

<template>
  <div class="box">
    <slot />
  </div>
</template>

<style lang="scss">
.box {
  border-radius: 25px;
  box-shadow: 0px 8px 8px 6px rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  color: white;

  &.red {
    background-color: $red;
  }

  &.orange {
    background-color: $orange;
  }

  &.green {
    background-color: $green;
  }
}
</style>
