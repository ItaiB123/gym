<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import Button from "../../../components/Button/Button.vue";
import {validateWorkout} from "../../../utils/validations";
import type {User} from "../../../dto/User";
import {useUserStore} from "../../../stores/userStores";
import {getAllData, postData} from "../../../utils/apiRequests";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const toast = useToast();
const router = useRouter();

const workoutDuration = ref(0);
const workoutDate = ref("");

const store = useUserStore();
const currentInstructor = ref<User>(store.getUser());
const warning = ref("");
const startTime = ref("");
const instructors = ref<User[]>([currentInstructor.value]);
const clients = ref<User[]>([]);

onMounted(async () => {
  let response = await getAllData("clients");
  if (response.length > 0) {
    response.forEach(item => {
      clients.value.push(item.id);
    });
    console.log("clients", clients.value);
  }
});

const isDisabled = computed(() => {
  return workoutDuration.value <= 0 ||
      workoutDate.value === "" ||
      startTime.value === "" ||
      instructors.value.length === 0;
});

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
const timeFormat = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const onResetForm = () => {
  workoutDuration.value = 0;
  workoutDate.value = "";
  warning.value = "";
  startTime.value = "";
  instructors.value = [currentInstructor.value];
  clients.value = [];
}

const separateIdsFromUsers = (users: User[]) => {
  return users.map(user => user.id) as number[];
}


const onSubmit = async () => {
  const instructorIds = separateIdsFromUsers(instructors.value);
  // const clientsIds = separateIdsFromUsers(clients.value);
  const clientsIds = [1];
  const errors = validateWorkout(workoutDuration.value, workoutDate.value, startTime.value, instructorIds, clientsIds);

  const start_time = `${startTime.value.hours.toString().padStart(2, "0")}:${startTime.value.minutes.toString().padStart(2, "0")}:00`;
  const workout_date = format(workoutDate.value);
  if (errors.length == 0) {
    const workout = {
      duration_in_minutes: workoutDuration.value,
      workout_date,
      start_time,
      instructor_ids: instructorIds,
      client_ids: clientsIds
    }
    console.log(workout)
    const response = await postData(workout, "workouts");
    if(response) {
    toast.success(`Workout created successfully for ${response.workout_date}`);
    onResetForm();
    await router.push("/dashboard");
    }
  } else {
    warning.value = errors.join(", ");

  }

}

</script>

<template>
  <div class="main">
    <h1>Create a New Workout</h1>
    <form @submit.prevent class="form-create">
      <div class="input">
        <label for="workoutDuration">Workout Duration in Minutes: </label>
        <input type="number" id="workoutDuration" v-model="workoutDuration"/>
      </div>
      <div class="input">
        <label for="datepicker">Workout Date</label>
        <VueDatePicker
            id="datepicker"
            v-model="workoutDate"
            :enable-time-picker="false"
            :format="format"
            :dark="true"
            :week-start="0"
            :disabled-week-days="[5,6]"
        />


        <div class="input">
          <label for="workoutStartTime">Workout Start Time</label>
          <VueDatePicker
              v-model="startTime"
              id="workoutStartTime"
              :minutes-increment="10"
              time-picker
              :format="timeFormat"
              :dark="true"
          />
        </div>
      </div>
      <div class="form-buttons">
        <p class="warning" v-if="warning">{{ warning }}</p>
        <Button @click="onSubmit" :is-disabled="isDisabled" :title="'Fill out the form first'" :buttonText="'Submit'"/>
        <Button :buttonText="'Reset Form'" :isReset="true" @click="onResetForm"/>
      </div>
    </form>
  </div>

</template>

<style scoped lang="scss">
.dp__theme_dark {
  --dp-border-radius: 4px;
  --dp-background-color: #95C03A;;
  --dp-text-color: #fff;
  --dp-hover-color: #95C03A;
  --dp-hover-text-color: #95C03A;
  --dp-hover-icon-color: #95C03A;
  --dp-primary-color: #fff;
  --dp-icon-color: #ffffff;


  --dp-primary-text-color: #fff;
  --dp-secondary-color: #fff;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-tooltip-color: #3e3e3e;
  --dp-menu-appear-transition-timing: cubic-bezier(.8, 0, 1, 1);
  --dp-font-size: 1.2rem;
  --dp-animation-duration: 0.2s;
  --dp-button-height: 80px;


  --dp-highlight-color: #428f59;
}

</style>