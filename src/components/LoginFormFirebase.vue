<template>
    <form @submit.prevent="loginUser" v-if="loginMode">
        <h1>Inicia sesión</h1>
        <div class="form-group">
            <label for="emailL">Correo electrónico</label>
            <input autocomplete="email" v-model="email" type="email" id="emailL" name="email" required>
        </div>
        <div class="form-group">
            <label for="passwordL">Contraseña</label>
            <input autocomplete="current-password" v-model="password" type="password" id="passwordL" name="password"
                required>
        </div>
        <p class="error" v-show="error">{{ error }}</p>
        <button type="submit">Iniciar sesión</button>
        <button type="button" class="subBtn" @click="switchLogin">Regístrate</button>
        <div class="split">Sin rodeos mediante</div>
        <button @click="googleLogin" type="button" class="btn btn-google">Google</button>
        <button @click="facebookLogin" type="button" class="btn btn-facebook">Facebook</button>
    </form>
    <form @submit.prevent="register" v-else>
        <h1>Regístrate</h1>
        <div class="form-group">
            <label for="usernameR">Username</label>
            <input autocomplete="username" v-model="username" type="username" id="usernameR" name="username" required>
        </div>
        <div class="form-group">
            <label for="emailR">Correo electrónico</label>
            <input autocomplete="email" v-model="email" type="email" id="emailR" name="email" required>
        </div>
        <div class="form-group">
            <label for="passwordR">Contraseña</label>
            <input autocomplete="current-password" v-model="password" type="password" id="passwordR" name="passwordF"
                required>
        </div>
        <div class="form-group">
            <label for="confirm_passwordR">Confirmar contraseña</label>
            <input autocomplete="current-password" v-model="confirm_password" type="password" id="confirm_passwordR"
                name="confirm_passwordF" required>
        </div>
        <p class="error" v-show="error">{{ error }}</p>
        <button type="submit">Regístrate</button>
        <p>¿Ya tienes cuenta?</p>
        <button class="subBtn" type="button" @click="switchLogin">Inicia sesión</button>
    </form>
</template>

<script setup>
// Importa la función ref de Vue
import { ref } from 'vue';
// Importa funciones de firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
// Importa el servicio de autenticación del backend
import AuthService from '../services/AuthService';


// Importa estado global de auth
import { useAuthStore } from '../store/auth';
const authStorage = useAuthStore();

// Estados para el login
const email = ref('');
const password = ref('');
const error = ref('');

// Estados para el registro
const confirm_password = ref('');
const username = ref('');

// Estados para el login a registro
const loginMode = ref(true);

// Cambiar entre login y registro
const switchLogin = () => {
    loginMode.value = !loginMode.value;
}

// Función para registrar usuario
const register = async () => {
    if (password.value !== confirm_password.value) {
        error.value = 'Las contraseñas no coinciden';
        return;
    }
    const authService = new AuthService();
    try {
        const res = await authService.register(username.value, email.value, password.value);
        if (!res) throw new Error(authService.getError());
        loginUser();
    } catch (err) {
        error.value = err.message;
    }
    
}

// Función para setear los datos en el store
const setUserToStore = (username, email, token, id, role) => {
    const user = {
        username,
        email,
        token,
        id,
        role
    }
    // Setea el usuario en el store
    authStorage.setUser(user);
}

const loginUser = async () => {
    const authService = new AuthService();
    try {
        const res = await authService.loginWithCredentials(email.value, password.value);
        if (!res) throw new Error(authService.getError());
        const token = res.token;
        const user = res.user;
        setUserToStore(user.username, user.email, token, user.id);
    } catch (err) {
        error.value = err.message;
    }
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();



const googleLogin = async () => {
    const auth = getAuth();
    const authService = new AuthService();
    try {
        await signInWithPopup(auth, googleProvider);
        const userData = getAuth().currentUser;
        const res = await authService.loginWithSocial(userData.uid, userData.displayName, userData.email);
        const token = res.token;
        const user = res.user;
        setUserToStore(user.username, user.email, token, user.id, user.role);
    } catch (err) {
        console.log(err);
        error.value = err.message;
    }
}

const facebookLogin = async () => {
    const auth = getAuth();
    const authService = new AuthService();
    try {
        await signInWithPopup(auth, facebookProvider);
        const userData = getAuth().currentUser;
        const res = await authService.loginWithSocial(userData.uid, userData.displayName, userData.email);
        const token = res.token;
        const user = res.user;
        setUserToStore(user.username, user.email, token, user.id, user.role);
    } catch (err) {
        console.log(err);
        error.value = err.message;
    }
}



</script>

<style scoped lang="scss">
form {
    color: $semi-black;
    width: 100%;
    max-width: 30em;
    padding: 1em;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    div,
    button {
        width: 100%;
    }

    .split {
        text-align: center;
        font-size: 0.8em;
        padding-bottom: 2px;
        border-bottom: 2px solid #ccc;
    }

    .subBtn {
        background-color: $semi-blue-light;
    }

    h1 {
        text-align: center;
        margin-bottom: 0.5em;
    }

    div {
        display: flex;
        flex-direction: column;
    }

    input {
        padding: 0.5em;
        margin: 0.5em 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 0.5em;
        margin: 0.5em 0;
        border: none;
        border-radius: 5px;
        background-color: $semi-blue;
        color: #fff;
        cursor: pointer;
        transition: transform 0.3s;
    }

    button:hover {
        transform: scale(1.05);
    }

    .btn-google {
        background-color: $google;
    }

    .btn-facebook {
        background-color: $facebook;
    }

    .error {
        text-align: center;
        color: red;
    }
}
</style>