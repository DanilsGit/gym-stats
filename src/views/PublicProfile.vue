<template>
    <ProfileLayout>
        <template #main>
            <div v-if="loading">
                Cargando...
                <v-icon scale="1.5" name="io-reload-circle" color="#fff" animation="spin" />
            </div>
            <div v-else class="routines-container">
                <h2>Rutinas de {{ user.username }}</h2>
                <PublicRoutine v-for="routine in routines" :key="routine.id" :routine="routine"
                    :toggleShowRoutine="toggleShow" />
            </div>
        </template>
        <template #aside>
            <header class="profile-page-header">
                <h1>Sobre Mi</h1>
                <ShareProfileButton :routeCopy="'/profile/' + user.id" />
            </header>
            <ProfileAsideLayout>
                <template #slot1>
                    <h3>Nombre</h3>
                    <p>{{ user.username }}</p>
                </template>
                <template #slot2>
                    <h3>Rutinas</h3>
                    <p>{{ routines.length }} Rutinas</p>
                </template>
                <template #slot3>
                    <h3>Mayor peso levantado</h3>
                    <p>{{ maxWeight(routines).weight }}kg en {{ maxWeight(routines).name }}</p>
                </template>
            </ProfileAsideLayout>
        </template>
    </ProfileLayout>
</template>

<script setup>
import ProfileLayout from '../layouts/ProfileLayout.vue'
import PublicRoutine from '../components/PublicRoutine.vue'
import ProfileAsideLayout from '../layouts/ProfileAsideLayout.vue'
import ShareProfileButton from '../components/ShareProfileButton.vue'

import { onBeforeMount, onUnmounted, ref, watch } from 'vue';
import { RoutinesService } from '../services/RoutinesService';
import { useRoute } from 'vue-router';
const id = useRoute().params.id
const myRoutineService = new RoutinesService();
const routines = ref([]);
const user = ref({});
const loading = ref(true);
const sharedProfile = ref(false);

watch(sharedProfile, (value) => {
    if (value) {
        sharedProfile.value = true
        setTimeout(() => {
            sharedProfile.value = false
        }, 2000)
    }
})

onBeforeMount(async () => {
    const data = await myRoutineService.getRoutinesAndInfoByUserId(id);
    const newRoutines = data.routines.map(routine => {
        return {
            ...routine,
            user: data.user,
        }
    });
    routines.value = newRoutines;
    user.value = data.user;
    loading.value = false;
    document.title = 'Perfil de ' + user.value.username;
});

onUnmounted(() => {
    document.title = 'Gym stats';
});

// Función para obtener el mayor peso levantado
const maxWeight = (routines) => {
    let info = {
        weight: 0,
        name: ''
    }
    if (routines.length === 0) {
        return info;
    }
    routines.forEach(routine => {
        routine.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                if (set.weight > info.weight) {
                    info.weight = set.weight;
                    info.name = exercise.name;
                }
            })
        })
    })
    return info;
}


const toggleShow = (id) => {
    routines.value.forEach(routine => {
        if (routine.id === id) {
            routine.show = !routine.show;
        } else {
            routine.show = false;
        }
    });
}
</script>


<style scoped lang="scss">
button {
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    background-color: $semi-blue;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
}

button:hover {
    background-color: $semi-blue-light;
}



.routines-container {
    display: flex;
    flex-direction: column;
    gap: 1em;

    h2 {
        font-size: 1.5em;
    }
}


.share-btn {
    position: relative;

    .share-tooltip {
        position: absolute;
        width: 5em;
        background-color: $semi-white;
        color: #000;
        padding: 0.5em;
        left: calc(50% - 2.5em);
        border-radius: 0.5em;
    }
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;

    h2 {
        font-size: 1.5em;
    }
}

p {
    padding: 0.5em;
    border-bottom: 2px solid #ccc;
}
</style>