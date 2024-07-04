import { defineStore } from "pinia";

// Auth store
export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            // Recoger user del localStorage, sino null
            user: window.localStorage.getItem('user-gym-stats') ? JSON.parse(window.localStorage.getItem('user-gym-stats')) : null,
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
            console.log('User set:', user);
            window.localStorage.setItem('user-gym-stats', JSON.stringify(user));
        },
        logout() {
            this.user = null;
            window.localStorage.removeItem('user-gym-stats');
        },
    },
});



