<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import { useUserStore } from "./stores/userStores";

const userStore = useUserStore();

const logout = () => {
  userStore.clearUser();

};

</script>

<template>
  <header>
    <Header @logout="logout" />
  </header>
 <RouterView />
</template>

<style scoped>
</style>
