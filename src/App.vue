<template>
  <nav class="router-nav">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">
          <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/icons%2Flogo.jfif?alt=media&token=74741f66-82e9-4760-9cd5-9463b5be06b8" alt="logo" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">Principal</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link :to="{ name: 'information' }">Información</router-link>
      </li>
      <li v-else>
        <router-link :to="{ name: 'routines' }">Rutinas</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link :to="{ name: 'login' }">Inicia sesión</router-link>
      </li>
      <li v-else>
        <router-link :to="{ name: 'profile' }">
          <p class="p-username">
            {{ user.username }}
          </p>
          <div class="icon-user">
            <v-icon name="fa-user-circle" scale="1.5" color="#fff" />
          </div>
        </router-link>
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

@media screen and (max-width: 700px) {
  .p-username {
    display: none;
  }
}

@media screen and (min-width: 700px) {
  .icon-user {
    display: none;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Inder&family=Varta:wght@300..700&display=swap');

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: $semi-blue;
  font-family: 'Varta', sans-serif;
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
  font-size: 1.1em;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    li {
      list-style: none;

      img {
        width: 3.5em;
        height: 3.5em;
        border-radius: 50%;
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