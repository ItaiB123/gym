<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref } from "vue";
import Button from "../Button/Button.vue";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const currentMonth = ref(dayjs());

const previousMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).subtract(1, "month");
};

const nextMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).add(1, "month");
};

const setCurrent = () => {
    currentMonth.value = dayjs();
};

const daysInMonth = computed(() => {
    return currentMonth.value.daysInMonth();
});
const currentMonthName = computed(() => {
    return `go to ${dayjs().format("MMMM")}`
})

</script>

<template>

    <div class="monthly-calendar">
        <div class="calendar-header">
            <Button @click="previousMonth" buttonText="&lt;" />
            <Button @click="setCurrent" :buttonText="currentMonthName" />
            <Button @click="nextMonth" buttonText="&gt;" />

        </div>
        <div class="days-of-week">
            <div class="day" v-for="day in daysOfWeek"> {{ day }}
            </div>
            <div class="days-in-month">
                <div v-for="day in daysInMonth" :key="day" class="day"></div>
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
.day{  
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.days-of-week {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>