<template>
    <button class="share-btn" @click="sharedFunction($event, props.routeCopy)">
        <v-icon name="fa-share-square" scale="1.5" color="#fff" />
        <Transition>
            <div class="share-tooltip" v-if="shared">
                <p>
                    Enlace copiado!
                </p>
            </div>
        </Transition>
    </button>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
    routeCopy: String,
})

const shared = ref(false)

const sharedFunction = (e, routeCopy) => {
    e.stopPropagation();
    const link = window.location.origin + routeCopy
    navigator.clipboard.writeText(link)
        .then(() => {
            shared.value = true;
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
        });
}

watch(shared, (value) => {
    if (value) {
        shared.value = true
        setTimeout(() => {
            shared.value = false
        }, 2000)
    }
})

</script>

<style scoped lang="scss">
.share-btn {
    position: relative;

    .share-tooltip {
        position: absolute;
        width: 5em;
        background-color: $semi-white !important;
        color: #000;
        padding: 0.5em;
        left: calc(50% - 2.5em);
        border-radius: 0.5em;
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