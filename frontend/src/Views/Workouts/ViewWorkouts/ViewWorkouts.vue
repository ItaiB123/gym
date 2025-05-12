<script setup lang="ts">
import { onMounted } from "vue";
import Calendar from "../../../components/Calendar/Calendar.vue";
import { getAllData } from "../../../utils/apiRequests";

const workouts = onMounted(async () => {
    const workouts = await getAllData("workouts");
    console.log(workouts);
});




</script>

<template>
    <Calendar />
</template>

