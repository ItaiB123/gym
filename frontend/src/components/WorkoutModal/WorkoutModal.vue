<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import {useUserStore} from "../../stores/userStores.ts";
import type {Workout} from "../../dto/workout.ts";

const userStore = useUserStore();
const user = ref(userStore.getUser());

const props = defineProps<{
  workouts?: Workout[]
}>();

const emit = defineEmits<{
  closeModal:() => void;
  workoutsUpdated: () => void;
}>();

watch(
    () => props.workouts,
    (val) => console.log('updated workouts:', val),
    { immediate: true }
);

const obliterateWorkout = async (workoutId: number) => {
console.log("workouts", workoutId);
};

</script>

<template>
  <div class="workout-display">
    <div class="close-container">
      <h2 class="modal-title">{{ props.workouts.workout_date}}</h2>
    </div>
    <table>
      <thead>
      <tr>
        <th>Instructors</th>
        <th>Clients</th>
        <th>Time</th>
        <th>Duration</th>
        <th v-if="user.type === 'instructor'">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="workout in workouts" :key="workout.id">
        <td class="instructor-cell">
          <button
              v-if="workout.instructor_workouts.length > 1"
              @click="openInstructorsModal(workout.instructor_workouts)"
          >
            Instructor List
          </button>
          <p
              v-else
              v-for="instructorInWorkout in workout.instructor_workouts"
              :key="instructorInWorkout.instructor_workouts.instructor_id"
          >
            {{ instructorInWorkout.instructor.name }}
          </p>
        </td>
        <td class="client-cell">
          <button @click="openClientsModal(workout.client_workouts)">
            Client List
          </button>
        </td>
        <td>{{ ` ${workout.start_time}` }}</td>
        <td>{{ workout.duration_in_minutes }} minutes</td>
        <td>
<!--          <RouterLink
              v-if="user.type === 'instructor'"
            :to="{ name: 'UpdateWorkout', params: { workoutId: workout.id } }"
          ><button :class="{'':true, 'gray-button':!(
                user.type === 'instructor' &&
                workout.workout_date >= new Date().toISOString().split('T')[0]

              )}"
                   :disabled="!(user.type === 'instructor' && workout.workout_date >= new Date().toISOString().split('T')[0])" >Edit</button></RouterLink>-->
          <button
              :class="{
                'delete-button': true,
                'gray-button': !(
                  user.type === 'instructor' &&
                  workout.workout_date >= new Date().toISOString().split('T')[0]
                ),
              }"

              :title="
                user.type === 'instructor' &&
                workout.workout_date >= new Date().toISOString().split('T')[0]
                  ? 'Delete workout forever'
                  : 'You can only delete workouts that are in the future'"
              @click="obliterateWorkout(workout.id)"
              :disabled="
                !(
                  user.type === 'instructor' &&
                  workout.workout_date >= new Date().toISOString().split('T')[0]
                )
              "
          >
            Delete Workout
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="close-container">
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>