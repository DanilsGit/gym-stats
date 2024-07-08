<template>
    <article class="routine">
        <div class="routine-header">
            <HeaderOptionsRoutines :focus="routine" :showToggle="showRoutineToggle" :deleteFocus="deleteRoutine"
                :addToFocus="addExercise" :text-add="'Ejercicio'" :saveName="saveRoutineName" />
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
import { defineProps } from 'vue';
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
});
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