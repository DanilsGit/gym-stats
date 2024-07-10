<template>
    <main class="routines-page">
        <h1>Descubre las rutinas creadas por la comunidad</h1>
        <section class="search-container">
            <input type="text" placeholder="Busca una rutina" />
            <button>Buscar</button>
        </section>
        <section class="routines-container">
            <PublicRoutine v-for="routine in routines" :key="routine.id" :routine="routine"
                :toggleShowRoutine="toggleShowRoutine"/>
        </section>
        <section class="pagination-btns">
            <button>{{ '⬅' }}</button>
                    <button>{{ '➡' }}</button>
        </section>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { RoutinesService } from '../services/RoutinesService'
import PublicRoutine from '../components/PublicRoutine.vue'

let routines = ref([])

const myRoutinesService = new RoutinesService()

onBeforeMount(async () => {
    routines = myRoutinesService.routines
    await myRoutinesService.getRoutines()
})


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


</script>

<style scoped lang="scss">
h1 {
    font-size: 2em;
    margin-bottom: 1em;
}

.routines-page {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    .search-container {
        display: flex;
        gap: 1em;
        margin-bottom: 1em;
        width: 95%;

        input {
            flex: 1;
            padding: 0.5em;
            border: 1px solid #ccc;
            border-radius: 0.5em;
        }

        button {
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