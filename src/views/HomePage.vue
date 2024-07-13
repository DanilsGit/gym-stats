<template>
    <main>
        <section class="presentation">
            <div class="presentation__content">
                <div class="presentation__content__info">
                    <h1>Gym stats</h1>
                    <p>¡Bienvenido!</p>
                    <p>Te estábamos esperando para ayudarte a cumplir tus metas</p>
                    <p>Personaliza y encuentra rutinas que se adapten a tus necesidades</p>
                </div>
                <div class="presentation__content__buttons">
                    <router-link class="presentation__content__buttons__link"
                        :to="{ name: 'login' }">Comenzar</router-link>
                    <router-link class="presentation__content__buttons__link" :to="{ name: 'information' }">Obtener más
                        información</router-link>
                </div>
            </div>
        </section>
        <section class="about">
            <div class="about__content__info">
                <h2>¿Qué es Gym Stats?</h2>
                <div class="about__content__info__text">
                    <p>
                        Gym Stats es una aplicación de entrenamiento que te permite llevar un control de tus rutinas de
                        ejercicios
                        con la capacidad de ajustarse a medida que avanzas en el gimnasio.
                        Con Gym Stats, puedes crear y consultar rutinas desde cualquier parte del mundo, utilizando tu
                        dispositivo móvil o computadora.
                        Además, ofrece la opción de personalizar rutinas con tus ejercicios preferidos y ajustar los
                        sets
                        según
                        tu progreso.
                        También puedes dejar notas en los ejercicios para recordar detalles específicos.
                    </p>
                    <p>
                        ¡Te invitamos a explora las rutinas de la comunidad! Todas las rutinas son públicas y se pueden
                        buscar fácilmente. Si
                        encuentras una rutina que te guste, es muy fácil copiarla y modificarla según tus necesidades.
                    </p>
                </div>
            </div>
            <div class="about__content__img">
                <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/home_page%2Faumentogym.jpg?alt=media&token=08a470f5-284c-4bb9-9165-865ec221cc4b"
                    alt="improve_gym" />
            </div>
        </section>
    </main>
    <Footer />
</template>

<script setup>
import Footer from '../components/Footer.vue';


</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.presentation {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/home_page%2Fbackground_gym.jpg?alt=media&token=92047c2b-9c8d-49ec-8f12-742c41c100a5');
    height: 80vh;
    background-size: cover;
    background-position: center;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    &__content {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2em;
        max-width: 1100px;
        border-radius: 10px;

        @media screen and (max-width: 800px) {
            flex-direction: column;
            justify-content: space-around;
        }


        &__info {
            text-align: left;
            color: #fff;

            h1 {
                font-size: 3em;
            }

            p {
                font-size: 1.5em;
            }
        }

        &__buttons {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &__link {
                width: 100%;
                text-align: center;
                background-color: #fff;
                color: #000;
                padding: 0.5em 1em;
                border-radius: 5px;
                margin: 0.5em;
                text-decoration: none;
                transition: 0.5s;
            }

            &__link:hover {
                background-color: $semi-blue-dark;
                color: #fff;
            }

        }

    }

}

.about {
    max-width: 1100px;
    padding: 2em;
    width: 100%;
    font-size: 1em;
    display: flex;
    justify-content: space-between;

    h2 {
        font-size: 2em;
    }

    p {
        font-size: 1.2em
    }


    &__content__info {
        flex: 1;
        max-width: 30em;
        display: flex;
        flex-direction: column;
        gap: 1em;

        &__text {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }

    }

    &__content__img {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 20em;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: right;
            border-radius: 10px;
            border: 2px solid #000;
        }
    }
}


@media screen and (max-width: 700px) {
    .about {
        flex-direction: column;
    }

    .about__content__info {
        max-width: none;
        width: 100%;
    }

    .about__content__img {
        max-width: none;
        width: 100%;
        margin-top: 2em;
    }
}
</style>