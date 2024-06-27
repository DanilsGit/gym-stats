import { ref } from "vue";
class AuthService {

    constructor() {
        this.jwt = ref('');
        this.error = ref('');
    }

    getJwt() {
        return this.jwt;
    }

    getError() {
        return this.error;
    }

    async login(username, password) {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            this.jwt.value = await data.token;

            if ('message' in data) return false;

            return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }
}

export default AuthService;