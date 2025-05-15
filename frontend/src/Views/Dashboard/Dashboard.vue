<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../../stores/userStores.js";
  import Button from "../../components/Button/Button.vue";


  const router = useRouter();
  const store = useUserStore();
  const user = ref(store.getUser());
  
  onMounted(() => {
    user.value = store.getUser();
  });
</script>

<template>
    <div class="main">
      <h1>
        Hello {{ user.name }}
      </h1>
      <h2>What would you like to do?</h2>
      <div class="options">
        <Button  :buttonText="'View Trainees'" routerLink="/clients/all" />
        <Button v-if="user.type === 'admin'" buttonText="View Instructors" routerLink="instructors/all" />
        <Button buttonText="View Workouts" routerLink="/workouts/all" />
        <Button buttonText="Add Trainee" routerLink="/clients/create" />
        <Button v-if="user.type === 'admin'" buttonText="Add Instructor" routerLink="instructors/create" />
        <Button buttonText="Add Workout" routerLink="/workouts/create" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  

  </style>