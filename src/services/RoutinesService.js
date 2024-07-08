import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";
import { watch } from "vue";

export class RoutinesService {

    constructor() {
        this.routines = ref([]);
        this.userRoutines = ref([]);
        this.error = ref(null);
    }

    getError() {
        return String(this.error.value);
    }

    // Watch para quitar el error en 3s
    watchError() {
        watch(this.error, () => {
            setTimeout(() => {
                this.error.value = null;
            }, 3000);
        });
    }

    // Traer todas las rutinas de la base de datos
    async getRoutines() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/routines`);
            this.routines.value = res.data;
            console.log(res.data);
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }


    // USUARIOS


    // Traer las rutinas del usuario, por medio de autenticación
    async getUserRoutines() {
        const authStore = useAuthStore();
        const user = authStore.user;
        const token = user.token;
        const userId = user.id;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/routines`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.userRoutines.value = res.data;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Actualizar nombre de la rutina del usuario
    async updateNameRoutine(routineId, name) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/routines/name`,
                {
                    id: routineId,
                    name
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            const newName = res.data.name
            const newUserRoutines = this.userRoutines.value.map(routine => {
                if (routine.id === routineId) {
                    routine.name = newName;
                }
                return routine;
            });
            this.userRoutines.value = newUserRoutines;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Crear una nueva rutina para el usuario
    async createUserRoutine(routine) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/routines`, routine, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newUserRoutines = this.userRoutines.value.filter(routine => routine.id !== 'new');
            newUserRoutines.push(res.data);
            this.userRoutines.value = newUserRoutines;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Eliminar una rutina del usuario
    async deleteUserRoutine(routineId) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/users/routines/${routineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.userRoutines.value = this.userRoutines.value.filter(routine => routine.id !== routineId);
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Ejercicios de las rutinas
    // Actualizar el nombre de un ejercicio
    async updateExerciseName(exerciseId, name) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/routines/exercises/name`,
                {
                    id: exerciseId,
                    name
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Crear un nuevo ejercicio
    async createExercise(exercise) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/routines/exercises`, exercise, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            // Cambiar el id del ejercicio creado
            this.userRoutines.value.forEach(routine => {
                routine.exercises.forEach(ex => {
                    if (ex.id === 'newExercise') {
                        ex.id = res.data.id;
                    }
                });
            });
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Eliminar un ejercicio
    async deleteExercise(exerciseId) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/routines/exercises/${exerciseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newRoutine = this.userRoutines.value.map(routine => {
                routine.exercises = routine.exercises.filter(exercise => exercise.id !== exerciseId);
                return routine;
            });
            this.userRoutines.value = newRoutine;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Actualizar un ejercicio
    async updateExercise(exercise) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/routines/exercises/sets`, exercise, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Al set de la rutina se le asigna el nuevo set
            // res.data es el array con los sets actualizados
            const newRoutine = this.userRoutines.value.map(routine => {
                routine.exercises = routine.exercises.map(ex => {
                    if (ex.id === exercise.id) {
                        ex.sets = res.data;
                    }
                    return ex;
                });
                return routine;
            });
            this.userRoutines.value = newRoutine;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }


}