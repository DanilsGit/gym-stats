<template>

    <section class="profile-page">
        <section class="profile-page-main">
            <h2>Rutinas</h2>
            <Routine v-for="routine in routines" :key="routine.id" :routine="routine" :showRoutineToggle="showRoutineToggle" />
        </section>
        <section class="profile-page-aside">
            <div class="profile-page-aside-content">
                <h1>{{ editMode ? 'Editar Información' : 'Sobre ti' }}</h1>
                <form class="profile-page-aside-information-edit" v-if="editMode" @submit.prevent="updateUser">
                    <div class="profile-page-aside-InformationGroup aside-group-container">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" name="name" value="Name" v-model="username" />
                    </div>
                    <div class="profile-page-aside-InformationGroup">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="Email" v-model="email" />
                    </div>
                    <button type="submit">Guardar cambios</button>
                </form>
                <div v-else class="profile-page-aside-information-display aside-group-container">
                    <div class="profile-page-aside-InformationGroup">
                        <p>{{ username }}</p>
                    </div>
                    <div class="profile-page-aside-InformationGroup">
                        <p>{{ email }}</p>
                    </div>
                    <div class="profile-page-aside-InformationGroup">
                        <p>{{ countRoutines() }} Rutinas</p>
                    </div>
                    <div class="profile-page-aside-InformationGroup">
                        <p>{{ maxWeight().weight }}kg en {{ maxWeight().name }}</p>
                    </div>
                    <button @click="logOut">Cerrar sesión</button>
                </div>
                <button @click="switchEditMode">{{ editMode ? 'Cancelar' : 'Editar Información' }}</button>
            </div>
        </section>
    </section>
</template>

<script setup>

import Routine from '../components/Routine.vue';
import { useAuthStore } from '../store/auth';
import { ref } from 'vue';


const routines = [
    {
        id: 1,
        show: false,
        name: 'Rutina Brazos',
        exercises: [
            {
                id: 1,
                name: 'Extensión de tríceps en polea',
                sets: [
                    {
                        reps: 12,
                        weight: 80,
                        note: 'Nota 1'
                    },
                    {
                        reps: 11,
                        weight: 80,
                        note: null
                    },
                    {
                        reps: 10,
                        weight: 80,
                        note: 'Nota 3'
                    }
                ]
            },
            {
                id: 2,
                name: 'Curl de bíceps con barra',
                sets: [
                    {
                        reps: 12,
                        weight: 30,
                        note: null
                    },
                    {
                        reps: 11,
                        weight: 30,
                        note: null
                    },
                    {
                        reps: 10,
                        weight: 30,
                        note: null
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        show: false,
        name: 'Rutina Piernas',
        exercises: [
            {
                id: 3,
                name: 'Sentadillas',
                sets: [
                    {
                        reps: 12,
                        weight: 80,
                        note: null
                    },
                    {
                        reps: 11,
                        weight: 80,
                        note: null
                    },
                    {
                        reps: 10,
                        weight: 80,
                        note: null
                    }
                ]
            },
            {
                id: 4,
                name: 'Prensa',
                sets: [
                    {
                        reps: 12,
                        weight: 80,
                        note: null
                    },
                    {
                        reps: 11,
                        weight: 80,
                        note: null
                    },
                    {
                        reps: 10,
                        weight: 80,
                        note: null
                    }
                ]
            }
        ]
    }
]

const authStore = useAuthStore();
const user = authStore.user;

const username = ref(user.username);
const email = ref(user.email);
const editMode = ref(false);

const countRoutines = () => {
    return routines.length;
}

const maxWeight = () => {
    let info = {
        weight: 0,
        name: ''
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

const updateUser = () => {
    authStore.setUser({
        username: username.value,
        email: email.value,
        id: user.id,
        token: user.token
    });
}

const logOut = () => {
    authStore.logout();

}

const switchEditMode = () => {
    editMode.value = !editMode.value;
}

const showRoutineToggle = (id) => {
    routines.forEach(routine => {
        if (routine.id === id) {
            routine.show = !routine.show;
        }
    })
    console.log(id);
}

</script>

<style scoped lang="scss">
.profile-page {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 0.5em;
    padding: 1em;

    .profile-page-aside {
        display: flex;
        justify-content: center;
        align-items: start;

        .profile-page-aside-content {
            background-color: $semi-blue-dark;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            padding: 1em;
            border-radius: 1em;
            gap: 1em;
            min-height: 40%;
            width: 90%;
            font-size: 0.9em;

            h1 {
                text-align: center;
            }

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

            .aside-group-container {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }

            .profile-page-aside-information-edit {
                display: flex;
                flex-direction: column;
                gap: 1em;

                .profile-page-aside-InformationGroup {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;

                    label {
                        font-weight: 600;
                    }

                    input {
                        padding: 0.5em;
                        background-color: transparent;
                        outline: none;
                        border: none;
                        color: $semi-white;
                        border-bottom: 2px solid #9aa4ff;
                    }
                }
            }

            .profile-page-aside-information-display {
                .profile-page-aside-InformationGroup {
                    p {
                        padding: 0.5em;
                        border-bottom: 2px solid #ccc;
                    }
                }
            }
        }
    }


    .profile-page-main{
        background-color: $semi-blue-dark;
        padding: 1em;
        border-radius: 1em;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

}
</style>