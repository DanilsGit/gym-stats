<template>
    <ProfileLayout>
        <template #main>
            <header>
                <h2>Mis Rutinas</h2>
                <p style="color: red;">
                    {{ error }}
                </p>
                <AddButton text="Rutina" @click="addNewRoutine" />
            </header>
            <Routine v-for="routine in routines" :key="routine.id" :routine="routine" v-if="!loading"
                :showRoutineToggle="showRoutineToggle" :toggleExerciseShow="toggleExerciseShow"
                :deleteRoutine="deleteRoutine" :addExercise="addExercise" :saveExercise="saveExercise"
                :deleteExercise="deleteExercise" :addSet="addSet" :saveRoutineName="saveRoutineName"
                :saveExerciseName="saveExerciseName" :removeSet="removeSet" :saveDescription="saveRoutineDescription" />
            <div v-else class="loading">
                <p>Cargando...</p>
            </div>
        </template>
        <template #aside>
            <header>
                <h1>{{ editMode ? 'Editar Información' : 'Sobre ti' }}</h1>
                <ShareProfileButton :routeCopy="'/profile/' + user.id" />
            </header>
            <form class="profile-page-aside-information-edit" v-if="editMode" @submit.prevent="updateUser">
                <div class="profile-page-aside-InformationGroup aside-group-container">
                    <label for="name">Usuario</label>
                    <input autocomplete="username" type="text" id="name" name="name" v-model="username" />
                </div>
                <div class="profile-page-aside-InformationGroup">
                    <label for="email">Email</label>
                    <input class="deny-edit" autocomplete="email" type="email" id="email" name="email" v-model="email"
                        readonly />
                </div>
                <p style="color: red;">
                    {{ errUsername }}
                </p>
                <button type="submit">Guardar cambios</button>
            </form>
            <div class="asideLayout" v-else>
                <ProfileAsideLayout>
                    <template #slot1>
                        <h3>Nombre</h3>
                        <p>{{ username }}</p>
                    </template>
                    <template #slot2>
                        <h3>Correo</h3>
                        <p>{{ email }}</p>
                    </template>
                    <template #slot3>
                        <h3>Rutinas</h3>
                        <p>{{ routines.length }} Rutinas</p>
                    </template>
                    <template #slot4>
                        <h3>Mayor peso levantado</h3>
                        <p>{{ maxWeight().weight }}kg en {{ maxWeight().name }}</p>
                    </template>
                </ProfileAsideLayout>
            </div>
            <button @click="switchEditMode">{{ editMode ? 'Cancelar' : 'Editar Información' }}</button>
            <button v-if="!editMode" @click="logOut">Cerrar sesión</button>

        </template>
    </ProfileLayout>
</template>

<script setup>

import AddButton from '../components/AddButton.vue';
import Routine from '../components/Routine.vue';
import { useAuthStore } from '../store/auth';
import { ref } from 'vue';
import { RoutinesService } from '../services/RoutinesService';
import { UserService } from '../services/UserService';
import { onBeforeMount } from 'vue';
import ProfileLayout from '../layouts/ProfileLayout.vue';
import ProfileAsideLayout from '../layouts/ProfileAsideLayout.vue';
import ShareProfileButton from '../components/ShareProfileButton.vue';

// Servicio de rutinas
const MyRoutineService = new RoutinesService();
const loading = ref(true);
let routines = ref([]);
let error = ref('');
const loadingSave = ref(false);

// Servicio de usuario
const myUserService = new UserService();
const errUsername = ref('');


onBeforeMount(async () => {
    try {
        await MyRoutineService.getUserRoutines();
        MyRoutineService.watchError();
        routines = MyRoutineService.userRoutines;
        error = MyRoutineService.getError();
        loading.value = false;
    } catch (error) {
        console.log(error);
        error.value = 'Ocurrió un error al cargar tus rutinas';
        loading.value = false;
    }
})

const authStore = useAuthStore();
const user = authStore.user;

const username = ref(user.username);
const email = ref(user.email);
const editMode = ref(false);

// Función para obtener el mayor peso levantado
const maxWeight = () => {
    let info = {
        weight: 0,
        name: 'todo'
    }

    if (loading.value) return info;

    routines.value.forEach(routine => {
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

// Función para cerrar todas las rutinas menos la seleccionada
const closeAllRoutine = (select) => {
    routines.value.forEach(routine => {
        if (routine.id !== select) {
            routine.show = false;
        } else {
            routine.show = true;
        }
    })
}

// Función para cerrar todos los ejercicios menos el seleccionado
const closeAllExercise = (select) => {
    routines.value.forEach(routine => {
        routine.exercises.forEach(exercise => {
            if (exercise.id !== select) {
                exercise.show = false;
            } else {
                exercise.show = true;
            }
        })
    })
}

// Función para agregar una nueva rutina
const addNewRoutine = () => {
    // Si ya hay una rutina nueva, no agregar otra
    const newRoutine = routines.value.find(routine => routine.id === 'new');
    if (newRoutine) {
        alert('Primero guarda un ejercicio en la nueva rutina antes de agregar otra');
        return;
    }

    // Cerrar todas las rutinas menos la nueva
    closeAllRoutine('new');

    // Agregar nueva rutina
    routines.value.push({
        id: 'new',
        show: true,
        name: 'Nueva Rutina',
        exercises: []
    });
}

// Función para eliminar una rutina
const deleteRoutine = async (e, routineId) => {

    if (routineId === 'new') {
        const newRoutines = routines.value.filter(routine => routine.id !== 'new');
        routines.value = newRoutines;
        return;
    }

    e.stopPropagation();
    const routine = routines.value.find(routine => routine.id === routineId);
    const accept = confirm(`¿Estás seguro de eliminar ${routine.name}?`);
    if (!accept) return;
    await MyRoutineService.deleteUserRoutine(routineId);
}

// Función para guardar una rutina
const saveRoutine = async () => {
    // Guardar la rutina
    const newRoutine = routines.value.find(routine => routine.id === 'new');
    if (!newRoutine) return;
    if (!newRoutine.name) {
        alert('Cambia el nombre de la rutina');
        return;
    }
    await MyRoutineService.createUserRoutine(newRoutine);
}

// Función para guardar el nombre de una rutina
const saveRoutineName = async (routineId, name) => {
    if (!name) {
        alert('Cambia el nombre de la rutina');
        return;
    }
    if (routineId === 'new') {
        const newRoutines = routines.value.map(routine => {
            if (routine.id === 'new') {
                routine.name = name;
            }
            return routine;
        });
        routines.value = newRoutines;
        return;
    }
    await MyRoutineService.updateNameRoutine(routineId, name);
}

// Función para guardar la descripción de una rutina
const saveRoutineDescription = async (routineId, description) => {
    if (routineId === 'new') return;
    await MyRoutineService.updateDescriptionRoutine(routineId, description);
}

// Función para agregar un nuevo ejercicio
const addExercise = (e, routineId) => {
    e.stopPropagation();

    // Si ya existe una rutina con id 'newExercise', no agregar otra
    const newExercise = routines.value.some(routine => routine.exercises.some(exercise => exercise.id === 'newExercise'));
    if (newExercise) {
        alert('Primero guarda el ejercicio nuevo antes de agregar otro');
        return;
    };

    // Cierra todas las rutinas
    closeAllRoutine(routineId);

    // Agregar nuevo ejercicio a la rutina
    const newRoutine = routines.value.map(routine => {
        if (routine.id === routineId) {
            routine.exercises.push({
                id: 'newExercise',
                name: 'Nuevo Ejercicio',
                sets: []
            });
        }
        return routine;
    });
    routines.value = newRoutine;

    // Cierra todos los ejercicios menos el seleccionado
    closeAllExercise('newExercise');
}

// Función para saber si el ejercicio tiene sets válidos
const hasValidSets = (sets) => {
    if (sets.length === 0) return false;
    return sets.every(set => set.reps && set.weight && set.rest);
}

// Función para guardar un ejercicio
const saveExercise = async (id) => {
    // Si existe una rutina con ejercicio con id 'newExercise'
    const newRoutine = routines.value.find(routine => routine.exercises.some(exercise => exercise.id === id));
    const exercise = newRoutine.exercises.find(exercise => exercise.id === id);

    if (!exercise) return;
    if (!exercise.name) {
        alert('Cambia el nombre del ejercicio');
        return;
    }

    // Verificar si el ejercicio es nuevo
    if (newRoutine && exercise.id === 'newExercise') {
        // Verificar si las series son válidas
        if (!hasValidSets(exercise.sets)) {
            alert('Agrega series válidas antes de guardar el ejercicio');
            return;
        }
        // Si es nuevo y tiene las series válidas y la rutina es nueva, guardar la rutina
        // (esto guarda el ejercicio también)
        if (newRoutine.id === 'new') {
            saveRoutine();
        } else {
            // Si la rutina no es nueva, pero el ejercicio sí, crear el ejercicio
            await createExercise(newRoutine.id, exercise);
        }
    } else {
        // Si el ejercicio no es nuevo, la rutina tampoco es nueva, guardar el ejercicio
        const newSets = exercise.sets.map(set => {
            return {
                id_set: set.id === 'newSet' ? null : set.id,
                reps: set.reps,
                weight: set.weight,
                note: set.note,
                rest: set.rest
            }
        });
        const newExercise = {
            idExercise: exercise.id,
            name: exercise.name,
            sets: newSets
        }
        console.log(newExercise);
        await MyRoutineService.updateExercise(newExercise);
    }

    // Cierra todos los ejercicios
    closeAllExercise(null);
}

// Función para crear un ejercicio a la bd
const createExercise = async (routineId, exercise) => {
    const newExercise = {
        idRoutine: routineId,
        name: exercise.name,
        sets: exercise.sets
    }
    await MyRoutineService.createExercise(newExercise);
}

// Función para guardar el nombre de un ejercicio
const saveExerciseName = async (exerciseId, name) => {
    if (!name) {
        alert('Cambia el nombre del ejercicio');
        return;
    }
    if (exerciseId === 'newExercise') return;
    await MyRoutineService.updateExerciseName(exerciseId, name);
}

// Función para eliminar un ejercicio
const deleteExercise = async (e, exerciseId) => {
    e.stopPropagation();
    const accept = confirm('¿Estás seguro de eliminar este ejercicio?');
    if (!accept) return;
    if (exerciseId === 'newExercise') {
        const newRoutines = routines.value.map(routine => {
            routine.exercises = routine.exercises.filter(exercise => exercise.id !== 'newExercise');
            return routine;
        });
        routines.value = newRoutines;
        return;
    }
    await MyRoutineService.deleteExercise(exerciseId);
}

// Función para agregar una nueva serie
const addSet = (e, exerciseId) => {
    e.stopPropagation();

    // Cierra todos los ejercicios menos el seleccionado
    routines.value.forEach(routine => {
        routine.exercises.forEach(exercise => {
            if (exercise.id !== exerciseId) {
                exercise.show = false;
            } else {
                exercise.show = true;
            }
        })
    })

    // Agregar una nueva serie al ejercicio
    const newRoutine = routines.value.map(routine => {
        routine.exercises = routine.exercises.map(exercise => {
            if (exercise.id === exerciseId) {
                exercise.sets.push({
                    id: 'newSet',
                    reps: 12,
                    weight: 0,
                    note: '',
                    rest: 2
                });
            }
            return exercise;
        });
        return routine;
    });
    routines.value = newRoutine;
}

// Función para quitar una serie
const removeSet = (setId) => {
    const newRoutine = routines.value.map(routine => {
        routine.exercises = routine.exercises.map(exercise => {
            exercise.sets = exercise.sets.filter(set => set.id !== setId);
            return exercise;
        });
        return routine;
    });
    routines.value = newRoutine;
}



// Función para mostrar u ocultar una rutina
const showRoutineToggle = (id) => {
    // Cambia el estado de la rutina, y cierra las demás
    routines.value.forEach(routine => {
        if (routine.id === id) {
            routine.show = !routine.show;
        } else {
            routine.show = false;
        }
    })
}

// Función para mostrar u ocultar un ejercicio
const toggleExerciseShow = (id) => {
    routines.value.forEach(routine => {
        routine.exercises.forEach(exercise => {
            if (exercise.id === id) {
                exercise.show = !exercise.show;
            } else {
                exercise.show = false;
            }
        })
    })
}

// Función para cambiar el modo de edición en el perfil
const switchEditMode = () => {
    editMode.value = !editMode.value;
    username.value = authStore.user.username;
}

// Función para actualizar la información del usuario
const updateUser = async () => {
    try {

        const data = await myUserService.updateUsername(username.value);

        if (!data) throw new Error('No se pudo actualizar el usuario');

        authStore.setUser({
            username: username.value,
            email: email.value,
            id: user.id,
            token: user.token
        });



        switchEditMode();
    } catch (err) {
        const error = myUserService.getError();
        errUsername.value = error;
    }
}

// Función para cerrar sesión
const logOut = () => {
    authStore.logout();

}

</script>

<style scoped lang="scss">
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

    input {
        padding: 0.5em;
        background-color: transparent;
        outline: none;
        border: none;
        color: $semi-white;
        border-bottom: 2px solid #9aa4ff;
    }

    label {
        font-weight: 600;
    }

    .deny-edit {
        cursor: not-allowed;
        color: #ffffff41;
    }

    .profile-page-aside-InformationGroup {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
}

.asideLayout {
    p {
        padding: 0.5em;
        border-bottom: 2px solid #ccc;
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



</style>