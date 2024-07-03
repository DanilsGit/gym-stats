<template>
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the home page</p>
        <p v-if="auth.isAuthenticated">Logged in as {{ auth.user }}</p>
        <p v-else>Not logged in</p>
    </div>
</template>

<script setup>
// Importa estado global de auth
import { useAuthStore } from '../store/auth';
const auth = useAuthStore();

</script>

<style scoped>

</style>