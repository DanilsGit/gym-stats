<template>
  <nav class="router-nav">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="logo" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">Principal</router-link>
      </li>
      <li v-show="!isAuthenticated">
        <router-link :to="{ name: 'information' }">Información</router-link>
      </li>
      <li v-show="isAuthenticated">
        <router-link :to="{ name: 'routines' }">Rutinas</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link :to="{ name: 'login' }">Inicia sesión</router-link>
      </li>
      <li v-else>
        <router-link :to="{ name: 'profile' }">{{ user.username }}</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from './store/auth';
const auth = useAuthStore();

const isAuthenticated = ref(auth.isAuthenticated);
const user = ref(auth.user);

</script>

<style lang="scss">
body {
  overflow-x: hidden;
  background-color: $semi-blue;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  color: $semi-white;
  @media screen and (max-width: 1200px){
    font-size: 15px;
  }
  @media screen and (max-width: 1050px){
    font-size: 14px;
  }
  @media screen and (max-width: 900px){
    font-size: 13px;
  }
  @media screen and (max-width: 750px){
    font-size: 12px;
  }
  @media screen and (max-width: 600px){
    font-size: 11px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.router-nav {
  width: 100%;
  background-color: $semi-blue-dark;
  padding: 0.5em;
  margin-bottom: 0.5em;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    li {
      list-style: none;

      img {
        width: 9em;
      }

      a {
        text-decoration: none;
        color: $semi-white;
        font-weight: 600;
        display: flex;
        align-items: center;
      }

      // Para los activos
      .router-link-active {
        color: $intente-blue;
      }
    }
  }
}
</style>