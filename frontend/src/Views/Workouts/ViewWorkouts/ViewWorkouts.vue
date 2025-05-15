<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllData } from "../../../utils/apiRequests";
import Calendar from "../../../components/Calendar/Calendar.vue";
import { useRouter } from "vue-router";
import WorkoutModal from "../../../components/WorkoutModal/WorkoutModal.vue";
import dayjs from "dayjs";

const workouts = ref([]);
const isWorkoutModalOpen = ref(false);
const router = useRouter();
const workoutsForDay = ref([]);

const openWorkoutModal = (date) => {
  workoutsForDay.value = workouts.value.filter((workout) =>
    dayjs(workout.workout_date).isSame(date, "day")
  );
  isWorkoutModalOpen.value = true;
};
const fetchWorkouts = async () => {
  workouts.value = await getAllData("workouts");
  console.log("workouts", workouts.value);
};


onMounted(async ()=> {
await  fetchWorkouts();
});

</script>

<template>
  <div v-if="isWorkoutModalOpen">
    <div class="overlay"></div>
    <div class="workout-modal">
      <WorkoutModal
          v-if="isWorkoutModalOpen"
          @closeModal="isWorkoutModalOpen = false"
          :workouts="workoutsForDay"
          @workoutsUpdated="fetchWorkouts"
      />
    </div>
  </div>
<Calendar :workouts="workouts" @openWorkoutModal="openWorkoutModal"  />
</template>

