<template>
  <nav class="router-nav">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="logo" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">Rutinas</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">Información</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }">Inicia sesión</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>


<script setup>

</script>

<style lang="scss">
body {
  overflow-x: hidden;
  background-color: $semi-blue;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: $semi-white;
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
  margin-bottom: 1em;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    li {
      list-style: none;

      img {
        width: 150px;
      }

      a {
        text-decoration: none;
        color: $semi-white;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      // Para los activos
      .router-link-active{
        color: $semi-blue-light;
      }
    }
  }
}
</style>