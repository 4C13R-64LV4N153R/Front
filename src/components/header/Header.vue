<script setup>
    import { ref } from 'vue';



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

            <p></p>
        </div>

        <div cass="user-menu">
            <button class="logout-button" @click="logout">Deconnection</button>
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


<style>

    .header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 30%;
        padding: 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ccc;
    }

    .bar-name {
        cursor: pointer;
    }


    .mainPage {
        padding: 15px;
    }

    .bar-list {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        top:12%;
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
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

        .logout-button:hover {
            background-color: #ff1a1a;
        }
</style>
