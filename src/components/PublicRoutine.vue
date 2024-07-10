<template>
    <article class="routine-article">
        <button class="routine-header" @click="toggleShowRoutine(routine.id)">
            <div class="routine-header-options">
                <v-icon class="row-icon" v-if="!routine.show" name="md-keyboardarrowdown" />
                <v-icon class="row-icon" v-else name="md-keyboardarrowup" />
                <h2>{{ routine.name }}</h2>
                <div class="social-btns">
                    <div v-if="!errorCopy">
                        <button @click="copyRoutine($event, routine)" v-if="!copied">
                            <v-icon scale="1.5" name="hi-solid-clipboard-copy" color="#fff" v-if="!loadingCopy" />
                            <v-icon scale="1.5" name="io-reload-circle" color="#fff" animation="spin" v-else />
                        </button>
                        <button v-else>
                            <v-icon scale="1.5" name="co-check" color="#fff" />
                        </button>
                    </div>
                    <v-icon v-else scale="1.5" name="io-warning" color="#fff" animation="ring" />
                    <button @click="shareRoutine($event, routine.id)" class="share-btn">
                        <Transition>
                            <div class="share-tooltip" v-if="shared">
                                <p>
                                    Enlace copiado!
                                </p>
                            </div>
                        </Transition>
                        <v-icon name="fa-share-square" scale="1.5" color="#fff" />
                    </button>
                </div>
            </div>
            <p>
                {{ routine.description }}
            </p>
            <p>Creador <button @click="(e) => goToProfile(e, routine.user.id)"><span>{{
                routine.user.username
                        }}</span></button></p>
        </button>
        <p style="color: red" v-if="errorCopy">
            {{ error }}
        </p>
        <div :class="{ 'routine-exercises': true, 'showExercises': routine.show }">
            <ul>
                <li v-for="exercise in routine.exercises" :key="exercise.id">
                    <button class="exercise-header" @click="toggleShowExercise(routine, exercise.id)">
                        <v-icon class="row-icon" v-if="!exercise.show" name="md-keyboardarrowdown" />
                        <v-icon class="row-icon" v-else name="md-keyboardarrowup" />
                        <h3>{{ exercise.name }}</h3>
                    </button>
                    <div :class="{ 'exercise-info': true, 'showSets': exercise.show }">
                        <ul>
                            <li v-for="set in exercise.sets" :key="set.id" class="set">
                                <div class="set-info">
                                    <div class="set-info-div">
                                        <p>{{ set.reps }}</p>
                                        <v-icon name="md-repeat" scale="1.2" color="#fff" />
                                    </div>
                                    <div class="set-info-div">
                                        <p>{{ set.weight }}</p>
                                        <v-icon name="gi-weight" scale="1.2" color="#fff" />
                                    </div>
                                    <div class="set-info-div">
                                        <p>{{ set.rest }}</p>
                                        <v-icon name="io-time-sharp" scale="1.2" color="#fff" />
                                    </div>
                                </div>
                                <p>{{ set.note }}</p>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </article>
</template>

<script setup>
import { RoutinesService } from '../services/RoutinesService';
import { ref, Transition, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    routine: Object,
    toggleShowRoutine: Function,
})

const loadingCopy = ref(false)
const errorCopy = ref(false)
const copied = ref(false)
const shared = ref(false)
let error = ref('')

watch(shared, (value) => {
    if (value) {
        shared.value = true
        setTimeout(() => {
            shared.value = false
        }, 2000)
    }
})

const myRoutinesService = new RoutinesService()
myRoutinesService.watchError()
error = myRoutinesService.error

const copyRoutine = async (e, routine) => {
    e.stopPropagation()
    loadingCopy.value = true
    const newRoutine = {
        userId: routine.user.id,
        name: routine.name,
        description: routine.description,
        public: false,
        exercises: routine.exercises.map((exercise) => {
            return {
                name: exercise.name,
                sets: exercise.sets.map((set) => {
                    return {
                        reps: set.reps,
                        weight: set.weight,
                        rest: set.rest,
                        note: set.note
                    }
                })
            }
        })
    }
    try {
        const res = await myRoutinesService.copyRoutine(newRoutine)
        loadingCopy.value = false
        errorCopy.value = !res
        copied.value = res
    } catch (err) {
        loadingCopy.value = false
        errorCopy.value = true
        error.value = 'Error al copiar la rutina, Intenta iniciar sesión y vuelve a intentarlo'
    }

}

const toggleShowExercise = (routine, id) => {
    routine.exercises.forEach((exercise) => {
        if (exercise.id === id) {
            exercise.show = !exercise.show
        } else {
            exercise.show = false
        }
    })
}

// Función para ir al perfil de un usuario
const goToProfile = (e, usernameId) => {
    e.stopPropagation()
    router.push({ name: 'public-profile', params: { id: usernameId } })
}

// Función para compartir una rutina
const shareRoutine = (e, id) => {
    e.stopPropagation();
    const link = window.location.origin + '/public-routine/' + id;
    navigator.clipboard.writeText(link)
        .then(() => {
            shared.value = true;
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
        });
}



</script>

<style scoped lang="scss">
h2 {
    font-size: 1.5em;
}

button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #fff;
}

span {
    font-weight: bold;
    color: #a3b7ff;
    letter-spacing: 1px;
}

.row-icon {
    background-color: #ffffff;
    width: 1.5em;
    height: 1.5em;
    color: #000;
    border-radius: 50%;
}

.routine-article {
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: $semi-blue-dark;

    .routine-header {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        color: #fff;
        text-align: left;

        .routine-header-options {
            width: 100%;
            display: flex;
            gap: 1em;
            justify-content: space-between;
            align-items: center;

            .social-btns {
                display: flex;
                gap: 1em;
                align-items: center;

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
            }
        }
    }

    .routine-exercises {
        max-height: 0px;
        overflow: hidden;
        font-size: 1.1em;

        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1em;

            li {
                border-top: 2px solid #ccc;
                padding: 1em;
                display: flex;
                flex-direction: column;
                gap: 0.5em;

                .exercise-header {
                    display: flex;
                    gap: 1em;
                    align-items: center;
                }

                .exercise-info {
                    max-height: 0px;
                    overflow: hidden;
                }

                .exercise-info.showSets {
                    max-height: 90vh;
                    transition: max-height 0.5s;
                }

                .set-info {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    gap: 1em;
                }

                .set-info-div {
                    display: flex;
                    gap: 0.5em;
                    align-items: center;
                }
            }

            .set {
                border: 2px solid $semi-blue-light;
                border-radius: 1em;
            }

        }
    }

    .routine-exercises.showExercises {
        max-height: 90vh !important;
        transition: max-height 0.5s;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.v-enter-from {
    opacity: 0;
    transform: translateY(-150%);
}

.v-enter-to {
    opacity: 1;
}

.v-leave-from {
    opacity: 1;
}

.v-leave-to {
    opacity: 0;
    transform: translateY(-150%);
}
</style>