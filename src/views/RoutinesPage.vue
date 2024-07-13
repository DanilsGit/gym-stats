<template>
    <main class="routines-page">
        <h1>Descubre las rutinas creadas por la comunidad</h1>
        <form class="search-container" @submit.prevent="searchToDB">
            <input class="search-text" type="text" placeholder="Busca rutinas, ejercicios o usuarios"
                v-model="search" />
            <input class="search-input" type="submit" value="Buscar"></input>
        </form>
        <p v-if="error" style="
        color: red;
        ">{{ error }}</p>
        <div v-if="loading">
            Cargando...
            <v-icon scale="1.5" name="io-reload-circle" color="#fff" animation="spin" />
        </div>
        <section class="routines-container" v-else>
            <PublicRoutine v-for="routine in routines" :key="routine.id" :routine="routine"
                :toggleShowRoutine="toggleShowRoutine" />
        </section>
        <section class="pagination-btns">
            <button @click="previousPage">{{ '⬅' }}</button>
            <span>{{ actualPage }}</span>
            <span>/</span>
            <span>{{ pages }}</span>
            <button @click="nextPage">{{ '➡' }}</button>
        </section>
    </main>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { RoutinesService } from '../services/RoutinesService'
import PublicRoutine from '../components/PublicRoutine.vue'

const routines = ref([])
const search = ref('')
const actualPage = ref(1)
const pages = ref(1)
const loading = ref(true)
const error = ref('')

const myRoutinesService = new RoutinesService()

onBeforeMount(async () => {
    try {
        const data = await myRoutinesService.getRoutines((actualPage.value - 1) * 10, 10, search.value)
        routines.value = data.routines
        pages.value = data.pages
        loading.value = false
        if (routines.value.length === 0) {
            error.value = 'No hay rutinas disponibles'
        }
    } catch (error) {
        console.error(error)
        error.value = 'Error inesperado'
        loading.value = false
    }
})


// Función para buscar rutinas/usuarios

const searchToDB = async () => {

    loading.value = true
    try {
        const data = await myRoutinesService.getRoutines(0, 10, search.value)
        routines.value = data.routines
        pages.value = data.pages
        actualPage.value = 1
        loading.value = false
        if (routines.value.length === 0) {
            error.value = 'No hay rutinas disponibles'
        }
    } catch (error) {
        console.error(error)
        error.value = 'Error inesperado'
        loading.value = false
    }
}

// Función para mostrar u ocultar las rutinas
const toggleShowRoutine = (id) => {
    routines.value.forEach((routine) => {
        if (routine.id === id) {
            routine.show = !routine.show
        } else {
            routine.show = false
        }
    })
}

// Función para ir a la página anterior
const previousPage = async () => {
    if (!(actualPage.value > 1)) return
    loading.value = true
    try {
        const previous = actualPage.value - 1
        const data = await myRoutinesService.getRoutines((previous - 1) * 10, 10, search.value)
        routines.value = data.routines
        actualPage.value = previous
    } catch (error) {
        console.error(error)
    }
    loading.value = false
}


// Función para ir a la página siguiente
const nextPage = async () => {
    if (!(actualPage.value < pages.value)) return
    loading.value = true
    try {
        const next = actualPage.value + 1
        const data = await myRoutinesService.getRoutines((next - 1) * 10, 10, search.value)
        routines.value = data.routines
        actualPage.value = next
    } catch (error) {
        console.error(error)
    }
    loading.value = false
}

</script>

<style scoped lang="scss">
h1 {
    font-size: 2em;
    margin: 1em 0em;
}

.routines-page {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    min-height: 90vh;

    .search-container {
        display: flex;
        gap: 1em;
        margin-bottom: 1em;
        width: 95%;

        .search-text {
            flex: 1;
            padding: 0.5em;
            border: 1px solid #ccc;
            border-radius: 0.5em;
        }

        .search-input {
            padding: 0.5em 1em;
            border: 1px solid #ccc;
            border-radius: 0.5em;
            background-color: #f0f0f0;
        }
    }


    .routines-container {
        display: flex;
        flex-direction: column;
        gap: 2em;
        width: 95%;
    }

    .pagination-btns {
        display: flex;
        align-items: center;
        gap: 1em;

        button {
            color: #000;
            padding: 0.5em 1em;
            background-color: $semi-white;
            border-radius: 1em;
            border: none;
            outline: none;
            cursor: pointer;
        }
    }
}
</style>