<template>
    <main class="login-page">
        <form
        @submit.prevent="login"
        >
            <h1>Inicia sesión</h1>
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input
                v-model="email"
                type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input
                v-model="password"
                type="password" id="password" name="password" required>
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>

    </main>
</template>

<script setup>
import { ref } from 'vue';

let email = ref('');
let password = ref('');

const login = () => {
    console.log(email.value, password.value);
}

</script>

<style scoped lang="scss">

.login-page{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form{
        color: $semi-black;
        width: 100%;
        max-width: 20em;
        padding: 1em;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
    }
}

</style>