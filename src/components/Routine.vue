<template>
    <article class="routine">
        <div class="routine-header">
            <button
            @click="showRoutineToggle(routine.id)"
            >{{ routine.show ?  '^' : 'v' }}</button>
            <h2>{{ routine.name }}</h2>
        </div>
        <ul>
            <li v-for="exercise in routine.exercises" :key="exercise.id">
                <h3>{{ exercise.name }}</h3>
                <ul>
                    <li v-for="set in exercise.sets" :key="set.id">
                        <p>Reps: {{ set.reps }}</p>
                        <p>Peso: {{ set.weight }}</p>
                        <p v-if="set.note">Nota: {{ set.note }}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </article>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
    routine: Object,
    showRoutineToggle: Function
});

const showExercises = ref(false);

</script>

<style scoped lang="scss">
.routine {
    background-color: blue;
    padding: 1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .routine-header {
        display: flex;
        align-items: center;
        gap: 1em;

        button {
            background-color: white;
            border: none;
            width: 2em;
            height: 2em;
            border-radius: 50%;
        }

    }

}
</style>