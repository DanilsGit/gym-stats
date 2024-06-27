<template>

    <div class="socialLogin">
        <h1>Inicia Sesión</h1>
        <div>
            <button
            @click="googleLogin"
            class="btn btn-google">Google</button>
            <button class="btn btn-facebook">Facebook</button>
        </div>
        {{ error }}
    </div>

</template>

<script setup>
// Importar los proveedores
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { ref } from 'vue';
const error = ref('');

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const auth = getAuth();

const googleLogin = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(res);
        const token = credentials?.accessToken;
        console.log(credentials);
        console.log(token);
        console.log('login');
    } catch (err) {
        console.log(err);
        error.value = err.message;
    }
}


</script>

<style scoped lang="scss">
.socialLogin {
    color: $semi-black;
    width: 100%;
    max-width: 20em;
    padding: 1em;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    >div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;
        align-items: center;

        button {
            padding: 0.5em;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
            background-color: $semi-blue-light;
            color: $semi-white;
            width: 70%;

            &:hover {
                transform: scale(1.1);
            }
        }

    }

}
</style>