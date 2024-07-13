import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";

export class UserService {

    constructor() {
        this.error = ref('');
    }

    getError() {
        return String(this.error.value);
    }

    // Modificar el username del usuario
    async updateUsername(newName) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/config/username`,
                {
                    username: newName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return true;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
            return false;
        }
    }

}
