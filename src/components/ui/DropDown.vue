<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  items: string[];
  text: string;
}>();

const emit = defineEmits(
    ['select']
);

const isOpen = ref(false);
const selectedItem = ref<string | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item: string) => {
  selectedItem.value = item;
  isOpen.value = false;
  emit('select', item);
};
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="dropdown-toggle" @click="toggleDropdown">
      {{ selectedItem || text}}
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;

  .dropdown-toggle {
    background-color: #D9D9D9;
    color: black;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border-radius: 30px;
    z-index: 1;
    position: relative;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    gap: 10px;

    position: absolute;
    z-index: 0;

    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

    width: calc(100% - 40px);
    max-height: 200px;

    overflow-y: auto;
    padding: 40px 20px 20px 20px;
    margin-top: -20px;
    border-radius: 0 0 30px 30px;


    li {
      list-style-type: none;
      cursor: pointer;

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
