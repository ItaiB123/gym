<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "../../stores/userStores";
import { useRouter, RouterLink } from "vue-router";
import type { User } from "../../dto/User";
import { useToast } from "vue-toastification";
import Button from "../Button/Button.vue";

const store = useUserStore();
let user = ref(store.getUser());
const router = useRouter();
const loggedIn = ref(store.isUserLoggedIn());
const toast = useToast();
const emit = defineEmits(["logout"]);


watch(
  () => store.isUserLoggedIn(),
  (newVal: boolean) => {
    loggedIn.value = newVal;
  }
);

watch(
  () => store.getUser(),
  (newVal:User) => {
    user.value = newVal;
  }
);

const logout = () => {
  toast.success("Logged out successfully");
  emit("logout");
  router.push("/");
};

</script>

<template>
  <div class='header-container'>
    <nav class="header-nav">
      <div class='navbar'>
<div class='logged-in-links' v-if="loggedIn">
        <p>Welcome {{user.name}}</p>
        <Button buttonText="Logout" @click="logout" />
      <Button buttonText="Home" routerLink="/" />
      <Button buttonText="Dashboard" routerLink="/dashboard" />

</div>
<div class='logged-out-links' v-else>
        <Button buttonText="Home" routerLink="/" />
        <Button routerLink="/login" :buttonText="'Login'"/>
  </div>
  </div>
    </nav>    
  </div>

</template>

<style scoped>
header {
  padding: 1rem;
  height: 5vh;
  margin-bottom: 20px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar>* {
  margin-right: 1rem;
}

.logged-out-links,
.logged-in-links {
  display: flex;
  align-items: center;
}

.nav-button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;

}


.logged-in-links p {
  margin-right: 1rem;
  font-weight: bold;
}
</style>