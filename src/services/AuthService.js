import { ref } from "vue";
import axios from "axios";
class AuthService {

    constructor() {
        this.error = ref('');
    }

    getError() {
        return String(this.error.value);
    }

    async loginWithCredentials(email, password) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email,
                password
            });
            return res.data;
        } catch (err) {
            this.error.value = err.response.data
            return false;
        }
    }

    async register(username, email, password) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                username,
                email,
                password
            });
            return res.data;
        } catch (err) {
            this.error.value = err.response.data;
            return false;
    }
}

    async loginWithSocial(id, username, email){
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login/social`, {
                id,
                username,
                email
            });
            return res.data;
        } catch (err) {
            console.log(err);
            this.error.value = err.response.data;
            return false;
        }
    }
}

export default AuthService;