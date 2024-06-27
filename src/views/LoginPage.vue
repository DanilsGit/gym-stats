<template>
    <main class="login-page">
        <LoginForm />
        <LoginFormFirebase />
        <LoginSocial />
    </main>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
import LoginFormFirebase from '../components/LoginFormFirebase.vue';
import LoginSocial from '../components/LoginSocial.vue';


</script>

<style scoped lang="scss">
.login-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1em;
}
</style>