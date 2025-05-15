import { createRouter, createWebHistory } from "vue-router";
import Home from "../Views/Home/Home.vue";
import Login from "../Views/Login/Login.vue";
import Dashboard from "../Views/Dashboard/Dashboard.vue";
import ViewWorkouts from "../Views/Workouts/ViewWorkouts/ViewWorkouts.vue";
import AddWorkout from "../Views/Workouts/AddWorkout/AddWorkout.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/workouts',
        children: [
            {
                path: 'all',
                name: 'ViewAllWorkouts',
                component: ViewWorkouts
            },
            {
                path: 'create',
                name: 'AddWorkout',
                component: AddWorkout
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;