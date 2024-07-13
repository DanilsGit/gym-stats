<template>
    <div class="profile-page-aside-information-display aside-group-container">
        <div class="profile-page-aside-InformationGroup">
            <slot name="slot1"></slot>
        </div>
        <div class="profile-page-aside-InformationGroup">
            <slot name="slot2"></slot>
        </div>
        <div class="profile-page-aside-InformationGroup">
            <slot name="slot3"></slot>
        </div>
        <div class="profile-page-aside-InformationGroup">
            <slot name="slot4"></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.profile-page-aside-information-display {
    display: flex;
    flex-direction: column;
    gap: 1em;
}


</style>