<script setup lang="ts">
    import router from '@/router';
import { computed, ref} from 'vue';

    const props = defineProps<{
        stateUser: string;
    }>();

    const showBarList = ref(false);
    const showBurgerMenu = ref(false);
    const isReturnPage = computed(() => {
        switch (props.stateUser) {
            case 'order':
            return true;
            case 'inventory':
            return true;
            default:
            return false;
        }
    });
    const isWalletPage = computed(() => {
        switch (props.stateUser) {
            case 'bars':
            return true;
            case 'stock':
            return true;
            default:
            return false;
        }
    });
    const selectedBar = ref('Nom du bar');
    const bars = ref(['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5', 'Bar 6', 'Bar 7', 'Bar 8', 'Bar 9']);

    const toggleBarList = () => {
        if(props.stateUser === "barman")showBarList.value = !showBarList.value;
    };


    const toggleBurgerMenu = () => {
    showBurgerMenu.value = !showBurgerMenu.value;

    };

    const selectBar = (bar: string) => {
        selectedBar.value = bar;
        showBarList.value = false;
    };

    function returnBtn () {
         router.go(-1);
    };

    function walletBtn() {
        if(props.stateUser == "bars"){
            router.push({ name: "stock" })
        }
        if(props.stateUser == "stock"){
            router.push({ name: "bars" })
        }
    };

    function navigateTo(path: string) {
         router.push({ name: path })
    }
</script>

<template>
<div class="header">
    <div>
        <button class="return-button" @click="returnBtn" v-if="isReturnPage">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.25 25.5L12.375 18L19.25 10.5V25.5Z" fill="white"/>
            </svg>
        </button>
        <button class="return-button" @click="walletBtn" v-if="isWalletPage">
            <svg width="40" height="40" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_115_52)">
                    <path d="M0.666672 0.5H3.33334L5.12 7.195C5.18097 7.4252 5.34794 7.63198 5.5917 7.77915C5.83546 7.92632 6.14047 8.0045 6.45334 8H12.9333C13.2462 8.0045 13.5512 7.92632 13.795 7.77915C14.0387 7.63198 14.2057 7.4252 14.2667 7.195L15.3333 3H4M6.66667 10.5C6.66667 10.7761 6.3682 11 6.00001 11C5.63182 11 5.33334 10.7761 5.33334 10.5C5.33334 10.2239 5.63182 10 6.00001 10C6.3682 10 6.66667 10.2239 6.66667 10.5ZM14 10.5C14 10.7761 13.7015 11 13.3333 11C12.9651 11 12.6667 10.7761 12.6667 10.5C12.6667 10.2239 12.9651 10 13.3333 10C13.7015 10 14 10.2239 14 10.5Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_115_52">
                        <rect width="16" height="12" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </button>
    </div>
    <div class="bar-name" @click="toggleBarList">
        <p v-if="stateUser == 'delivery'"> Livreur</p>
        <p v-if="stateUser == 'stock'"> Stock</p>
        <p v-if="stateUser == 'bars' || stateUser == 'order' || stateUser == 'inventory'">{{ selectedBar }}</p> 
        <p v-if="stateUser == 'noState'">Choisir une activité</p>
    </div>

    <div class="burger-menu" @click="toggleBurgerMenu">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div v-if="showBarList" class="bar-list">
        <ul>
            <li v-for="bar in bars" :key="bar" @click="selectBar(bar)">{{ bar }}</li>
        </ul>
    </div>

    <div v-if="showBurgerMenu" class="burger-menu-list">
      <ul>
        <li @click="navigateTo('stock')">Stock</li>
        <li @click="navigateTo('delivery')">Livreur</li>
        <li @click="navigateTo('bars')">Bar</li>
        <li @click="returnBtn">Déconnexion</li>
      </ul>
    </div>
</div>
<div class="mainPage">
    <slot />
</div>
</template>

<style lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 3px 11px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 30px 30px;
    position: relative;
    background: white;
}

.bar-name {
    cursor: pointer;
}

.mainPage {
    padding: 30px 20px;
}

.bar-list {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    top: 70%;
    left: 45%;
}

.bar-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.bar-list li {
    padding: 10px;
    cursor: pointer;
}

.bar-list li:hover {
    background-color: #f0f0f0;
}

.return-button {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 20px;
    transition: background-color 0.3s ease;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 24px;
        height: 24px;
        fill: white;
    }
}

.burger-menu-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  top: 70%;
  left: 60%;
  padding: 10px;
  border-radius: 8px;
}

.burger-menu-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.burger-menu-list li {
  padding: 10px;
  cursor: pointer;
}

.burger-menu-list li:hover {
  background-color: #f0f0f0;
}
</style>
