<template>
    <form @submit.prevent="loginUser">
        <h1>Inicia sesión</h1>
        <div class="form-group">
            <label for="user">Username</label>
            <input v-model="email" type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="password" name="password" required>
        </div>
        <button type="submit">Iniciar sesión</button>
        <p>{{ error }}</p>
    </form>
</template>

<script setup>
import AuthService from '../services/AuthService'
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const error = ref('');

const loginUser = async () => {
    const auth = new AuthService();
    const res = await auth.login(email.value, password.value)
    console.log(res);
    if (!res) {
        error.value = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
            error.value = '';
        }, 5000);
    }
}




</script>

<style scoped lang="scss">
form {
    color: $semi-black;
    width: 100%;
    max-width: 20em;
    padding: 1em;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1em;

    h1 {
        text-align: center;
        margin-bottom: 1em;
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
    }

    p {
        text-align: center;
        color: red;
    }
}
</style>
