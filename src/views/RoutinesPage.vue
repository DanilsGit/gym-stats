<template>
    <section class="routines-page">
        <h1>Descubre las rutinas creadas por la comunidad</h1>
        <section class="search-container">
            <input type="text" placeholder="Busca una rutina" />
            <button>Buscar</button>
        </section>
        <section class="routines-container">
            <article v-for="routine in routines" :key="routine.id" class="routine-article">
                <header>
                    <div class="routine-header-options">
                        <button>
                            <v-icon class="row-icon" v-if="!routine.show" name="md-keyboardarrowdown" />
                            <v-icon class="row-icon" v-else name="md-keyboardarrowup" />
                        </button>
                        <h2>{{ routine.name }}</h2>
                        <button>
                            <v-icon scale="1.5" name="hi-solid-clipboard-copy" color="#fff" />
                        </button>
                    </div>
                    <p>Creador <button><span>{{ routine.user.username }}</span></button></p>
                    <p>
                        Esta rutina es para y tiene una duración de semanas.
                        Esta rutina es para y tiene una duración de semanas.
                        Esta rutina es para y tiene una duración de semanas.
                        Esta rutina es para y tiene una duración de semanas.
                        Esta rutina es para y tiene una duración de semanas.
                    </p>
                </header>
                <div v-if="routine.show">
                    <ul>
                        <li v-for="exercise in routine.exercises" :key="exercise.id">
                            <h3>{{ exercise.name }}</h3>
                            <p>{{ exercise.description }}</p>
                            <p>{{ exercise.sets }} sets of {{ exercise.reps }} reps</p>
                        </li>
                    </ul>
                </div>
            </article>
        </section>
    </section>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { RoutinesService } from '../services/RoutinesService'

let routines = ref([])

const myRoutinesService = new RoutinesService()

onBeforeMount(async () => {
    routines = myRoutinesService.routines
    await myRoutinesService.getRoutines()
})



</script>

<style scoped lang="scss">
h1 {
    font-size: 2em;
    margin-bottom: 1em;
}

h2 {
    font-size: 1.5em;
}

button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

span {
    font-weight: bold;
}

.row-icon {
    background-color: white;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
}

.routines-page {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;

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

        .routine-article {
            padding: 1em;
            border: 1px solid #ccc;
            border-radius: 0.5em;
            display: flex;
            flex-direction: column;
            gap: 1em;

            header {
                display: flex;
                gap: 0.4em;
                flex-direction: column;
                gap: 1.5em;

                .routine-header-options {
                    width: 100%;
                    display: flex;
                    gap: 1em;
                    justify-content: space-between;
                    align-items: center;
                }
            }

            ul {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 1em;

                li {
                    padding: 1em;
                    border: 1px solid #ccc;
                    border-radius: 0.5em;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;
                }
            }
        }

    }

}
</style>