<template>
    <main class="login-page">
        <!-- <LoginForm /> -->
        <LoginFormFirebase/>
        <!-- <LoginAWS /> -->
    </main>
</template>

<script setup>
// import LoginAWS from '../components/LoginAWS.vue';
// import LoginForm from '../components/LoginForm.vue';
import LoginFormFirebase from '../components/LoginFormFirebase.vue';
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