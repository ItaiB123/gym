<script setup lang="ts">
import { ref } from "vue";
import { errorHandler } from "../../utils/errorHandler";
import { validateLogin } from "../../utils/validations";
import Button from "../Button/Button.vue";
const name = ref("");
const phone = ref("");

const emit = defineEmits(["submit"]);

const props = defineProps<{
  mode?: 'Login' | 'Signup'
}>()

const onSubmit = () => {
    console.log(name.value, phone.value);
    let errors = validateLogin(name.value , phone.value);
   if(errors.length === 0){
    emit("submit", { name: name.value, phone: phone.value });
}else{
    errorHandler({
        message:errors.join(", "),
        status: 422,
        code: "invalid_phone_or_name",
        showStackTrace: false
    });
}
};

</script>

<template>
    <div class="user-form">
        <h3>{{props.mode}}</h3>

        <form @submit.prevent>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
            <label for="phone">Phone</label>
            <input type="text" id="phone" v-model="phone" />
            <Button :buttonText="props.mode" @click="onSubmit" />
        </form>

    </div>
</template>

<style scoped>
.user-form {
    display: flex;
    flex-direction: column;
}
    </style>
