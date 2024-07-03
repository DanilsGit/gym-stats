<template>
    
</template>

<script setup>
// Importa la función ref de Vue
import { ref } from 'vue';

// Importa estado global de auth
import { useAuthStore } from '../store/auth';
const authStorage = useAuthStore();

// Recibir el GoToLogin del padre
const props = defineProps({
    goToLogin: Function
});

// Estados para el register
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const error = ref('');

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

    .login {
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