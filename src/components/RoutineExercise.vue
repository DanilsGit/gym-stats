<template>
    <li class="Exercise">
        <HeaderOptionsRoutines :focus="exercise" :showToggle="toggleExerciseShow" :deleteFocus="deleteExercise"
            :addToFocus="addSet" :textAdd="'Serie'" :saveName="saveExerciseName" />
        <div :class="{ 'exercise-sets-container-show': true, 'show-exercise': exercise.show }">
            <button class="save-exercise" @click="saveExercise(exercise.id)">Guardar Cambios</button>
            <ul class="exercise-sets">
                <li v-for="(set, i) in exercise.sets" :key="set.id" class="Set">
                    <div class="Set-header">
                        <h3>Set {{ i + 1 }}</h3>
                        <button @click="removeSet(set.id)">
                            <v-icon name="fa-trash-alt" color="#fff" />
                        </button>
                    </div>
                    <div class="Set-content">
                        <div class="Set-group">
                            <input type="number" :id="'reps' + set.id" v-model="set.reps" />
                            <label :for="'reps' + set.id">
                                <v-icon name="md-repeat" scale="1.2" color="#fff" />
                            </label>
                        </div>
                        <div class="Set-group">
                            <input type="number" :id="'weight' + set.id" v-model="set.weight" />
                            <label :for="'weight' + set.id">
                                <v-icon name="gi-weight" scale="1.2" color="#fff" />
                            </label>
                        </div>
                        <div class="Set-group">
                            <input type="number" :id="'rest' + set.id" v-model="set.rest" />
                            <label :for="'rest' + set.id">
                                <v-icon name="io-time-sharp" scale="1.2" color="#fff" />
                            </label>
                        </div>
                    </div>
                    <div class="Set-group group-textarea">
                        <label class="hidden-label" :for="'note' + set.id">Observaciones</label>
                        <textarea :id="'note' + set.id" v-model="set.note"
                        placeholder="Observaciones a tener en cuenta en este set"
                        ></textarea>
                    </div>
                </li>
            </ul>
        </div>
    </li>
</template>

<script setup>
import HeaderOptionsRoutines from './HeaderOptionsRoutines.vue';

const props = defineProps({
    exercise: Object,
    toggleExerciseShow: Function,
    saveExercise: Function,
    addSet: Function,
    deleteExercise: Function,
    saveExerciseName: Function,
    removeSet: Function,
});

</script>

<style scoped lang="scss">
.Exercise {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    background-color: $semi-blue;
    padding: 0.5em;
    border-radius: 1em;
    font-size: 0.9em;

    .exercise-sets-container-show {
        width: 100%;
        max-height: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .save-exercise {
        width: 20em;
        padding: 0.5em;
        border: none;
        border-radius: 1em;
        background-color: $semi-white;
        color: #000;
        font-weight: 600;
        cursor: pointer;
        transition: 1s;
    }

    .exercise-sets {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding-left: 1em;

        .Set {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            padding: 0.5em;
            border-left: 2px solid $semi-white;

            .Set-header {
                display: flex;
                justify-content: space-between;

                button {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            }

            .Set-group {
                font-size: 1.3em;
            }

            .group-textarea {
                display: flex;
                flex-direction: row;
                gap: 0.5em;

                textarea {
                    padding: 0.2em;
                    background-color: $semi-transparent;
                    color: $semi-white;
                    border: none;
                    outline: none;
                    border-bottom: 2px solid $semi-white;
                    font-size: 1em;
                    resize: vertical;
                    width: 100%;
                    max-height: 10em;
                }
            }

            .Set-content {
                display: flex;
                gap: 0.5em;
                justify-content: center;

                div {
                    display: flex;
                    gap: 0.5em;

                    input {
                        color: $semi-white;
                        background-color: transparent;
                        border: none;
                        outline: none;
                        padding: 0.1em;
                        border-bottom: 2px solid $semi-white;
                        font-weight: 600;
                        width: 3em;
                        text-align: center;
                    }
                }
            }
        }
    }
}

.exercise-sets-container-show.show-exercise {
    max-height: 90vh;
    overflow: auto;
    transition: max-height 1s;
}
</style>