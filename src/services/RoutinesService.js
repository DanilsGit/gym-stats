import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";
import { watch } from "vue";

export class RoutinesService {

    constructor() {
        this.routines = ref([]);
        this.userRoutines = ref([]);
        this.error = ref('');
    }

    getError() {
        let err = String(this.error.value);
        if (err.includes('Token de autorización inválido')) {
            err = 'Sesión expirada, por favor inicia sesión nuevamente';
            const authStore = useAuthStore();
            authStore.logout();
        }
        return err;
    }

    // Watch para quitar el error en 3s
    watchError() {
        watch(this.error, () => {
            setTimeout(() => {
                this.error.value = null;
            }, 5000);
        });
    }

    // Traer todas las rutinas de la base de datos
    async getRoutines(offset, limit, search) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/routines`, {
                params: {
                    offset,
                    limit,
                    search: search || ''
                }
            });

            const pages = await res.data.pages;
            const newRoutines = await res.data.routines.map(routine => {
                const user = routine.users[0];
                return { ...routine , user };
            });
            return {
                routines: newRoutines,
                pages
            }

        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Traer una rutina por su id
    async getRoutineById(routineId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/routines/${routineId}`);
            return res.data;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
        }
    }

    // Traer las rutinas de un usuario por su id, sin autenticación
    async getRoutinesAndInfoByUserId(userId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/routines/${userId}`);
            return res.data;
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
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/routines`, {
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

    // Actualizar la descripción de la rutina del usuario
    async updateDescriptionRoutine(routineId, description) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/routines/description`,
                {
                    id: routineId,
                    description
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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

    // Copiar una rutina de la comunidad al usuario
    async copyRoutine(routine) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/routines/copy`,
                routine
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return true;
        } catch (err) {
            this.error.value = err.response.data
            console.log(err);
            return false;
        }
    }

    // Eliminar una rutina del usuario
    async deleteUserRoutine(routineId) {
        const authStore = useAuthStore();
        const token = authStore.user.token;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/routines/${routineId}`, {
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