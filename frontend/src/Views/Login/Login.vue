<script setup lang="ts">
import UserForm from "../../components/UserForm/UserForm.vue";
import { useUserStore } from "../../stores/userStores";
import { useRouter } from "vue-router";
import { login } from "../../utils/apiRequests";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter(); 
const toast = useToast();
const onSubmit = async (data: { name: string, phone: string }) => {
    let response = await login(data);
    userStore.setUser({id: response.id, name: response.name, phone: response.phone_number, type: "instructor"});
    toast.success("Logged in successfully");
    router.push("/dashboard");
};

</script>

<template>
    <div class="main-container">
      <div class="title">
        <h1>Trainer Login</h1>
      </div>
      <UserForm mode="Login" @submit="onSubmit" />
    </div>
  </template>