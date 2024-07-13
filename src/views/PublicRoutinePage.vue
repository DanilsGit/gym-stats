<template>

    <main>
        <p style="font-size: 1em; color: #f00" v-if="error">{{ error }}</p>
        <h1 v-else>¡Rutina compartida!</h1>
        <section v-if="routine" class="routine-container">
            <PublicRoutine :routine="routine" :toggleShowRoutine="toggleShowRoutine">
            </PublicRoutine>
        </section>
    </main>

</template>

<script setup>
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { RoutinesService } from '../services/RoutinesService';
import PublicRoutine from '../components/PublicRoutine.vue';

const myRoutineService = new RoutinesService();
const id = useRoute().params.id
let error = ref(null)
let routine = ref(null)

const toggleShowRoutine = (id) => {
    routine.value = { ...routine.value, show: !routine.value.show }
}

onBeforeMount(async () => {
    document.title = '¡Te han compartido esta rutina!'
    try {
        const data = await myRoutineService.getRoutineById(id);
        routine.value = data;
        error.value = myRoutineService.getError();
    } catch (error) {
        error.value = 'Error al cargar la rutina, por favor reporta este error al administrador'
    }
})

onUnmounted(() => {
    document.title = 'Gym stats'
})


</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    .routine-container {
        width: 90%;
        min-height: 90vh;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 1rem;
    }
}
</style>