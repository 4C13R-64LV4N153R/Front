<template>
    <div class="header">
        <div class="user-icon" @click="toggleUserMenu">
            <img src="user-icon.png" alt="User Icon" />
        </div>
        <div class="bar-name" @click="toggleBarList">
            {{ selectedBar }}
        </div>

        <div v-if="showUserMenu" class="user-menu">
            <button @click="logout">Déconnection</button>
        </div>

        <div v-if="showBarList" class="bar-list">
            <ul>
                <li v-for="bar in bars" :key="bar" @click="selectBar(bar)">{{ bar }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showUserMenu = ref(false);
    const showBarList = ref(false);
    const selectedBar = ref('Nom du bar');
    const bars = ref(['Bar 1', 'Bar 2', 'Bar 3']);

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
      showBarList.value = false;
    };

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

    return {
      showUserMenu,
      showBarList,
      selectedBar,
      bars,
      toggleUserMenu,
      toggleBarList,
      selectBar,
      logout,
    };
  },
};
</script>

<style>
    .header {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ccc;
    }

    .user-icon {
        margin-right: 20px;
        cursor: pointer;
    }

    .bar-name {
        cursor: pointer;
    }

    .user-menu, .bar-list {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .user-menu {
        right: 10px;
    }

    .bar-list {
        left: 50px;
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
</style>
