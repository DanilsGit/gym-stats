<template>
    <main class="profile-page">
        <section class="profile-page-main">
            <slot name="main"></slot>
        </section>
        <section class="profile-page-aside">
            <div class="profile-page-aside-content">
                <slot name="aside"></slot>
            </div>
        </section>
    </main>
</template>

<script>
</script>

<style scoped lang="scss">
.profile-page {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 0.5em;
    padding: 1em;
    min-height: 90vh;

    .profile-page-main {
        height: 100%;
        background-color: $semi-blue-dark;
        padding: 1em;
        border-radius: 1em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        min-height: 90vh;
    }

    .profile-page-aside {
        display: flex;
        justify-content: center;
        align-items: start;

        .profile-page-aside-content {
            background-color: $semi-blue-dark;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            padding: 1em;
            border-radius: 1em;
            gap: 1em;
            max-height: 50em;
            width: 90%;
            font-size: 0.9em;
        }
    }


}


@media screen and (max-width: 1000px) {
    .profile-page {
        display: flex;
        flex-direction: column-reverse;
    }
}
</style>