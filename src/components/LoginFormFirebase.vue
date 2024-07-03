<template>
    <form @submit.prevent="loginUser" v-if="loginMode">
        <h1>Inicia sesión</h1>
        <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input v-model="email" type="email" id="emailF" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="passwordF" name="password" required>
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
            <label for="email">Correo electrónico</label>
            <input v-model="email" type="email" id="emailF" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="passwordF" name="passwordF" required>
        </div>
        <div class="form-group">
            <label for="password">Confirmar contraseña</label>
            <input v-model="confirm_password" type="password" id="confirm_passwordF" name="confirm_passwordF" required>
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

// Importa estado global de auth
import { useAuthStore } from '../store/auth';
const authStorage = useAuthStore();

// Estados para el login
const email = ref('');
const password = ref('');
const error = ref('');

// Estados para el registro
const confirm_password = ref('');

// Estados para el login a registro
const loginMode = ref(true);

// Cambiar entre login y registro
const switchLogin = () => {
    loginMode.value = !loginMode.value;
}

// Función para registrar usuario
const register = () => {
    if (password.value !== confirm_password.value) {
        error.value = 'Las contraseñas no coinciden';
        setTimeout(() => {
            error.value = '';
        }, 5000);
        return;
    }
    console.log('Registrando usuario');
}

// Función para setear los datos en el store
const setUserToStore = (username, email, token, id) => {
    const user = {
        username,
        email,
        token,
        id
    }
    // Setea el usuario en el store
    authStorage.setUser(user);
}

const loginUser = async () => {
    const auth = getAuth();
    try {
        const res = await signInWithEmailAndPassword(auth, email.value, password.value);
        const token = res.user.accessToken;
        authStorage.setUser(token);
        console.log(res);
    } catch (err) {
        console.log(err.message);
        error.value = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
            error.value = '';
        }, 5000);
    }
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const auth = getAuth();

const googleLogin = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(res);
        const userData = getAuth().currentUser;
        setUserToStore(userData.displayName, userData.email, credentials.accessToken, userData.uid)
    } catch (err) {
        console.log(err);
        error.value = err.message;
    }
}

const facebookLogin = async () => {
    try {
        const res = await signInWithPopup(auth, facebookProvider);
        const credentials = FacebookAuthProvider.credentialFromResult(res);
        const token = credentials?.accessToken;
        authStorage.setUser(token);
        const userData = getAuth().currentUser;
        console.log(userData);
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