<template>
    <button id="header-btn" @click="showToggle(focus.id)">
        <button @click="(e) => deleteFocus(e, focus.id)" class="btn-trash">
            <v-icon name="fa-trash-alt" color="#fff" />
        </button>
        <div class="header-options">
            <v-icon class="row-icon-black" v-if="!focus.show" name="md-keyboardarrowdown" />
            <v-icon class="row-icon-black" v-else name="md-keyboardarrowup" />
            <input class="OneLine EditableTitle" type="text" v-model="focus.name" @click.stop v-if="isTitleEditable" />
            <h2 class="OneLine" v-else>{{ focus.name }}</h2>
            <button @click="(e) => editTitleRoutine(e)" v-if="!isTitleEditable">
                <v-icon name="fa-regular-edit" scale="1.2" color="#fff" />
            </button>
            <button @click="(e) => { saveName(focus.id, focus.name); editTitleRoutine(e) }" v-else>
                <v-icon name="la-save-solid" scale="1.2" color="#fff" />
            </button>
        </div>
        <AddButton :text="textAdd" @click="(e) => addToFocus(e, focus.id)" />
    </button>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import AddButton from './AddButton.vue';

const props = defineProps({
    focus: Object,
    showToggle: Function,
    deleteFocus: Function,
    addToFocus: Function,
    textAdd: String,
    saveName: Function,
});

const isTitleEditable = ref(false);

const editTitleRoutine = (e) => {
    e.stopPropagation();
    isTitleEditable.value = !isTitleEditable.value;
}


</script>

<style scoped lang="scss">
#header-btn {
    display: flex;
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    justify-content: space-between;
    gap: 1em;
    cursor: pointer;
    padding: 0.5em;

    .header-options {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        width: 70%;

        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }

        .OneLine {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: $semi-white;
        }
    }

    .btn-trash {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            transition: 0.5s;
        }
    }

    .row-icon-black {
        background-color: $semi-white;
        border-radius: 50%;
        width: 1.3em;
        height: 1.3em;
        color: #000;
    }

    h2 {
        font-size: 1.5em;
        color: $semi-white;
    }

    .EditableTitle {
        min-width: 8em;
        max-width: 15em;
        font-size: 1.5em;
        color: $semi-white;
        background-color: transparent;
        border: none;
        outline: none;
        text-align: center;
        border-bottom: 2px solid $semi-white;
    }
}
</style>