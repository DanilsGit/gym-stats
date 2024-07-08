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
import { computed } from 'vue';
import { useAuthStore } from './store/auth';
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

</script>

<style lang="scss">
body {
  overflow-x: hidden;
  background-color: $semi-blue;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  color: $semi-white;

  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }

  @media screen and (max-width: 1050px) {
    font-size: 14px;
  }

  @media screen and (max-width: 900px) {
    font-size: 13px;
  }

  @media screen and (max-width: 750px) {
    font-size: 12px;
  }

  @media screen and (max-width: 600px) {
    font-size: 11px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 1em;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  /* Propiedad estándar */
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
  appearance: textfield;
  /* Propiedad estándar para compatibilidad */
}

.hidden-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  /* Añadir para asegurar que el texto no se desborde */
  border: 0;
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