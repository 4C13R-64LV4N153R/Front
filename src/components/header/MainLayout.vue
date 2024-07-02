<script>
import { ref} from 'vue';

const showBarList = ref(false);
const isInventory = ref(false);
const selectedBar = ref('Nom du bar');
const bars = ref(['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5', 'Bar 6', 'Bar 7', 'Bar 8', 'Bar 9']);

const toggleBarList = () => {
    showBarList.value = !showBarList.value;
    showUserMenu.value = false;
};

const selectBar = (bar) => {
    selectedBar.value = bar;
    showBarList.value = false;
};

const logout = () => {
    // Handle logout logic here
    console.log('User logged out');
};
</script>

<template>
<div class="header">
    <div class="bar-name" @click="toggleBarList">
        <p v-if="isInventory"> Inventaire</p>
        <p v-if="!isInventory">{{ selectedBar }}</p>
        <p>Nom du bar</p>
    </div>

    <div class="user-menu">
        <button class="logout-button" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"/>
                </g>
            </svg>
        </button>
    </div>

    <div v-if="showBarList" class="bar-list">
        <ul>
            <li v-for="bar in bars" :key="bar" @click="selectBar(bar)">{{ bar }}</li>
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
    justify-content: center;
    gap: 30%;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 3px 11px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 30px 30px;
    position: relative;
}

.user-menu {
    position: absolute;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);
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
    top: 12%;
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

.logout-button {
    background-color: $red;
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
</style>
