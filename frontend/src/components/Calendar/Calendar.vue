<script setup lang="ts">
import dayjs from "dayjs";
import {computed, ref} from "vue";
import Button from "../Button/Button.vue";
import type {Workout} from "../../dto/workout.ts";



const props = defineProps<{
  workouts?: Workout[]
}>()
const emit = defineEmits<{
  openWorkoutModal: (date: string) => void;
}>();

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthInView = ref(dayjs());

const previousMonth = () => {
  monthInView.value = dayjs(monthInView.value).subtract(1, "month");
};

const nextMonth = () => {
  monthInView.value = dayjs(monthInView.value).add(1, "month");
};

const setCurrent = () => {
  monthInView.value = dayjs();
};

const openWorkoutModal = (date) => {
  emit("openWorkoutModal", date);
};

const daysInMonth = computed(() => {
  const workoutsThisMonth = props.workouts.filter((workout) =>
      dayjs(workout.workout_date).isSame(monthInView.value, "month")
  );
  const firstDayOfMonth = monthInView.value.startOf("month").day();
  const totalDaysInMonth = monthInView.value.daysInMonth();
  const days = [];
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = monthInView.value.date(i);
    const workoutsForToday = workoutsThisMonth.filter((workout) => dayjs(workout.workout_date).isSame(date, "day"))
    const hasWorkout = workoutsForToday.length > 0;
    const startTimes = workoutsForToday.map((workout) =>
        `${workout.start_time.slice(12,16)}`
    )

    days.push({
      day: i,
      date: date.format("YYYY-MM-DD"),
      hasWorkout,
      startTime: startTimes,
      workoutsForDay: workoutsForToday
    })
  }
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.unshift({
      date: null,
      day: "",
      hasWorkout: false,
      startTime: "",
    });
  }
  return days;
});


const returnToMonth = computed(() => {
  return `go to ${dayjs().format("MMMM")}`
})
const monthToDisplay = computed(() => {
  return monthInView.value.format("MMMM");
});

</script>

<template>

  <div class="monthly-calendar">
    <div class="calendar-header">
      <div class="button-layout">
        <Button @click="previousMonth" buttonText="&lt;"/>
        <Button @click="setCurrent" :buttonText="returnToMonth"/>
        <Button @click="nextMonth" buttonText="&gt;"/>
      </div>
      <div class="month-display">
        <h2>
          {{ monthToDisplay }}
        </h2>
      </div>
    </div>

    <div class="days-of-week">
      <div class="day" v-for="day in daysOfWeek"> {{ day }}
      </div>
    </div>
    <div class="days">
      <div
          v-for="day in daysInMonth"
          :key="day.date"
          class="day"
          :class="{ 'has-workout': day.hasWorkout }"
          @click="day.hasWorkout && openWorkoutModal(day.date)"
      >
        {{ day.day }}
        <span
            v-if="day.hasWorkout"
            class="workout-times"
        >
            {{
            day.workoutsForDay.length > 1
                ? `${day.workoutsForDay.length} workouts`
                : day.startTime[0]
          }}
          </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
}

.day {
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
}

.monthly-calendar {
  flex: 3;
  max-width: 800px;
  height: 100%;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

.calendar-header {
  //display: flex;
  justify-content: space-between;
  //align-items: center;
}

.month-display {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.button-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.days-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  border: #95C03A solid 1px;
}

.day {
  text-align: center;
  padding: 10px;
  margin: 5px;
  gap: 10px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.has-workout {
  background-color: #95c03a;
  font-weight: bold;
  color: white;
  overflow: hidden;
  cursor: pointer;
}

.workout-times {
  display: block;
  font-weight: lighter;
  overflow: hidden;
  cursor: pointer;
  font-size: small;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(82, 82, 82, 0.84);
  z-index: 997;
}


</style>