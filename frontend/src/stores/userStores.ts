import { defineStore } from "pinia";
import type { User } from "../dto/User";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "",
      name: "",
      phone: "",
      type: "",
    },
  }),
  actions: {
    setUser(newUser: User) {
      this.user = newUser;
    },
    clearUser() {
      this.user = {
        id: "",
        name: "",
        phone: "",
        type: "",
      };
    },
    isUserLoggedIn() {
      return this.user.id !== "";
    },
    getUser() {
      return this.user;
    },
  },
  persist: {
    enabled: true,
  },
});