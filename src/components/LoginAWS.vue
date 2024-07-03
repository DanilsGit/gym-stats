<template>
    <div>
        <Authenticator>

            <template v-slot="{ user, signOut }">
                <h1>hola {{ user.signInDetails.loginId }}</h1>
                
                <button @click="signOut">Sign Out</button>
            </template>

        </Authenticator>
    </div>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
</script>

<style scoped></style>