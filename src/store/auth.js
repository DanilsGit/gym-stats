import { defineStore } from "pinia";

// Auth store
export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null
            // El user es un objeto con la siguiente estructura:
            // {
            //     id: string,
            //     username: string,
            //     email: string,
            //     role: string,
            //     token: string,
            // }
        };
    },
    getters: {
        isAuthenticated: (state) => {
            return state.user !== null;
        },
    },
    actions: {
        setUser(user) {
            this.user = user;
            if (user) this.router.push({ name: 'profile' });
        },
        logout() {
            this.user = null;
            this.router.push({ name: 'login' });
        },
    },
    persist: true,
});



