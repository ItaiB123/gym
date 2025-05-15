import type { User } from "../dto/User";

export const validateUser = (name: string, phone: string) => {
    let errors = []
    if (name.length === 0) {
        errors.push("Name is required");
    }
    if (phone.length !== 10) {
        errors.push("Phone number must be 10 digits");
    }
    if (name.length < 3) {
        errors.push("Name must be at least 3 characters");
    }
    if (!phone.startsWith("0")) {
        errors.push("Phone number must start with 0");
    }
    return errors;
}

export const validateWorkout = (workoutDuration: number, workoutDate: string, startTime: string, instructors:number[], clients:number[]) => {
    let errors = []
    if (!workoutDuration || workoutDuration <= 0) {
        errors.push("Workout duration must be greater than 0");
    }
    if (workoutDate === "") {
        errors.push("Workout date is required");
    }
    if (startTime === "") {
        errors.push("Start time is required");
    }
    if (new Date(workoutDate) < new Date()) {
        errors.push("You cannot schedule a workout in the past");
    }
    // if (instructors.length === 0) {
    //     errors.push("At least one instructor is required");
    // }
    // if (clients.length === 0) {
    //     errors.push("At least one client is required");
    // }
    // if (workoutDate < new Date().toISOString().split('T')[0]) {
    //     errors.push("Workout date must be in the future");
    // }
    // if (startTime < new Date().toISOString().split('T')[1]) {
    //     errors.push("Start time must be in the future");
    // }
    if(workoutDuration > 180) {
        errors.push("Workout duration must be less than 180 minutes");
    }
    if(workoutDuration < 30) {
        errors.push("Workout duration must be greater than 30 minutes");
    }

    return errors;
}