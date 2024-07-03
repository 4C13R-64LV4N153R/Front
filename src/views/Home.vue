<script setup lang="ts">
import { useRouter } from 'vue-router';
import DropDown from "@/components/ui/DropDown.vue";
import { computed, ref } from "vue";
import MainButton from "@/components/ui/MainButton.vue";
import { Roles } from "@/types/role";

const router = useRouter();

const bars = ref(['bar 1', 'bar 2', 'bar 3', 'bar 4']);
const roles = [Roles.Barista, Roles.DeliveryPerson, Roles.StockManager];

const role = ref<string | null>(null);
const bar = ref<string | null>(null);

const displayButton = computed(() => {
  return role.value !== null && (role.value !== Roles.Barista || (role.value === Roles.Barista && bar.value !== null));
});

const displayBars = computed(() => {
  return role.value === Roles.Barista;
});

const updateRole = (selectedRole: string) => {
  role.value = selectedRole;
  if (selectedRole !== Roles.Barista) {
    bar.value = null;
  }
};

const updateBar = (selectedBar: string) => {
  bar.value = selectedBar;
};

async function redirect() {
  try {
    if (role.value === Roles.Barista && bar.value !== null) {
      await router.push(`/inventory-management/${bar.value}`);
    } else if (role.value === Roles.DeliveryPerson) {
      await router.push('/order-status');
    } else if (role.value === Roles.StockManager) {
      await router.push('/bars');
    }
  } catch (error) {
    console.error('Error during redirection:', error);
  }
}
</script>

<template>
  <div class="home">
    <div class="top">
      <img src="/assets/logo.png" alt="logo">
    </div>
    <div class="home-content">
      <DropDown class="roles" :items="roles" text="Choisissez un rôle" @select="updateRole" />
      <DropDown v-if="displayBars" class="bars" :items="bars" text="Choisissez un bar" @select="updateBar" />
    </div>
    <MainButton v-if="displayButton" @click="redirect">C'est parti</MainButton>
  </div>
</template>

<style lang="scss">
.home {
  background-image: url("/assets/background.svg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;

  .top {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 11px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 30px 30px;
    position: relative;
    background: white;

    img {
      height: 40px;
      width: auto;
    }
  }

  .home-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 60px 20px;

    .roles {
      position: relative;
      z-index: 2;
    }

    .bars {
      position: relative;
      z-index: 0;
    }
  }
}
</style>
