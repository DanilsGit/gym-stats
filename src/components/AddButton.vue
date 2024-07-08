<template>
    <button id="btn-add">
        <v-icon name="md-addcircleoutline" color="#000" scale="0.8" />
        {{ props.text }}
        </button>
</template>

<script setup>
const props = defineProps({
    text: String
});
</script>

<style scoped lang="scss">
#btn-add {
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    background-color: $semi-white;
    color: #000;
    font-weight: 600;
    cursor: pointer;
    transition: 1s;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.1em;

    &:hover {
        background-color: $semi-gray;
    }
}
</style>