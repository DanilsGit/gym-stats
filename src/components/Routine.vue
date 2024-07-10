<template>
    <article class="routine">
        <div class="routine-header">
            <HeaderOptionsRoutines :focus="routine" :showToggle="showRoutineToggle" :deleteFocus="deleteRoutine"
                :addToFocus="addExercise" :text-add="'Ejercicio'" :saveName="saveRoutineName" />
            <div class="routine-info">
                <textarea class="routine-textarea" v-model="routine.description" v-if="isDescriptionEditable"
                    placeholder="Descripción de la rutina"></textarea>
                <p v-else>{{ routine.description }}</p>
                <button v-if="!isDescriptionEditable" @click="toggleDescriptionEdit">
                    Editar descripción
                </button>
                <button v-else @click="()=>{toggleDescriptionEdit(); saveDescription(routine.id, routine.description)}">
                    Guardar descripción
                </button>
            </div>
        </div>
        <div :class="{ 'show-content': true, 'show': routine.show }">
            <ul class="routine-exercises">
                <RoutineExercise v-for="exercise in routine.exercises" :key="exercise.id" :exercise="exercise"
                    :toggleExerciseShow="toggleExerciseShow" :saveExercise="saveExercise" :addSet="addSet"
                    :deleteExercise="deleteExercise" :saveExerciseName="saveExerciseName" :removeSet="removeSet" />
            </ul>
        </div>
    </article>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import RoutineExercise from './RoutineExercise.vue';
import HeaderOptionsRoutines from './HeaderOptionsRoutines.vue';

const props = defineProps({
    routine: Object,
    showRoutineToggle: Function,
    deleteRoutine: Function,
    toggleExerciseShow: Function,
    addExercise: Function,
    saveExercise: Function,
    deleteExercise: Function,
    addSet: Function,
    saveRoutineName: Function,
    saveExerciseName: Function,
    removeSet: Function,
    saveDescription: Function,
});

const isDescriptionEditable = ref(false);

const toggleDescriptionEdit = () => {
    isDescriptionEditable.value = !isDescriptionEditable.value;
}

</script>

<style scoped lang="scss">
.routine {
    background-color: $semi-blue-light;
    padding: 0.5em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    transition: max-height 1s;
    font-size: 0.9em;
    scrollbar-color: $semi-white transparent;
    scrollbar-width: thin;

    .routine-info {

        display: flex;
        flex-direction: column;
        gap: 1em;

        .routine-textarea {
            background-color: $semi-blue-dark;
            width: 100%;
            color: $semi-white;
            border: none;
            border-radius: 0.5em;
            padding: 0.5em;
            font-size: 0.9em;
            resize: vertical;
        }

        button {
            background-color: $semi-blue;
            color: $semi-white;
            border: none;
            border-radius: 0.5em;
            padding: 0.5em;
            cursor: pointer;
            transition: background-color 0.5s;

            &:hover {
                background-color: $semi-blue-dark;
            }
        }
    }



    .show-content {
        max-height: 0;
        overflow: hidden;
    }

    button {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li {
        list-style-type: none;
    }

    .routine-exercises {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
}

.show-content.show {
    max-height: 50em;
    overflow: auto;
    transition: max-height 1.5s;
}
</style>