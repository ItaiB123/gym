import { useToast } from "vue-toastification";
import type { AppError } from "../dto/AppError";
const toast = useToast();

export const errorHandler = (error: AppError) => {
  if (error.status) {
    if (error.status === 401) {
      toast.error("Unauthorized");
    } else if (error.status === 403) {
      toast.error("Forbidden");
    } else if (error.status === 422) {
      toast.error(`Validation error. Please check your input. ${error.message}`);
    } else if (error.status === 404) {
      toast.error("Your details were not found, try again.");
    } else if (error.status === 500) {
      toast.error("Server error");
    } else {
      toast.error(error.message);
    }
  } else if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
  } else {
    toast.error("An unexpected error occurred");
  }
};