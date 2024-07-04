<script setup lang="ts">
import { useRouter } from 'vue-router';
import DropDown from "@/components/ui/DropDown.vue";
import { computed, ref, onMounted } from "vue";
import MainButton from "@/components/ui/MainButton.vue";
import { Roles } from "@/types/role";
import { Option } from "@/types/option";


const router = useRouter();
import {useApi} from "@/composition/api";
const {getBars} = useApi()

const bars = ref([
  { key: "1", value: "bar 1"},
  { key: "2", value: "bar 2" },
  { key: "3", value: "bar 3" }
]);
const roles = [
  { key: Roles.Barista, value: Roles.Barista },
  { key: Roles.DeliveryPerson, value: Roles.DeliveryPerson },
  { key: Roles.StockManager, value: Roles.StockManager }
];
const role = ref<Option | null>(null);
const bar = ref<Option | null>(null);

const displayButton = computed(() => {
  return role.value !== null && (role.value.value !== Roles.Barista || (role.value.value === Roles.Barista && bar.value !== null));
});

const displayBars = computed(() => {
  return role.value?.value === Roles.Barista;
});

const updateRole = (selectedRole: Option) => {
  role.value = selectedRole;
  if (selectedRole.value !== Roles.Barista) {
    bar.value = null;
  }
};

const updateBar = (selectedBar: Option) => {
  bar.value = selectedBar;
};

async function redirect() {
  try {
    if (role.value?.value === Roles.Barista && bar.value !== null) {
      await router.push(`/inventory-management/${bar.value.key}`);
    } else if (role.value?.value === Roles.DeliveryPerson) {
      await router.push('/order-status');
    } else if (role.value?.value === Roles.StockManager) {
      await router.push('/bars');
    }
  } catch (error) {
    console.error('Error during redirection:', error);
  }
}

async function loadBar() {
  const allInfoBars = await getBars();
  bars.value = allInfoBars.map(bar => ({
    key: bar.id,
    value: bar.nom
  }));
}

onMounted(() => {
  loadBar()
});

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
    box-shadow: 0 3px 11px 2px rgba(0, 0, 0, 0.3);
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
