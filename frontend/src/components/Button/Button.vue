<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title?: string,
  buttonText?: string,
  class?: string,
  isReset?: boolean,
  routerLink?: string,
  isDisabled?: boolean
}>()

const emit = defineEmits(['click'])
const buttonClass = computed(() => {
  if(props.isDisabled){
    return 'disabled-button select-button'
  }
    if(props.class){
        return props.class
    }
    if(props.isReset){
        return 'reset-button'
    }
    return 'select-button'
})


</script>

<template>


    <RouterLink v-if="props.routerLink" :to="props.routerLink" class="router-link">
        <button :title="props.title" @click="emit('click')" :class="'router-link-button'">{{props.buttonText}}</button>
    </RouterLink>
    <button v-else @click="emit('click')" :class="buttonClass" :title="props.title" :disabled="isDisabled">{{props.buttonText}}</button>
</template>

<style scoped>
  .reset-button {
    background-color: #DB2219;
    margin-top: 0;
  }
  
  .reset-button:hover {
    background-color: #a71c15;
    margin-top: 0;
  }
  .router-link {
    margin: 20px;
    padding: 0;
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
  .router-link-button {
    margin: 0;
  }
  
  .select-button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
  .disabled-button {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .disabled-button:hover {
    background-color: #ccc;
    cursor: not-allowed;
  }

  
  button {
    width: 175px;
    margin: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: #95C03A;
    color: white;
    cursor: pointer;
    /* box-shadow: white 2px 2px 2px; */
    transition: all 0.3s ease;
  }
  
  button:hover {
    background-color: #789a2e;
    box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    text-decoration: none;
  }
  


</style>