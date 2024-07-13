<template>

    <main class="information-page">
        <h1>Todo lo necesario para comenzar</h1>
        <section class="information">
            <p>Aquí encontrarás todo lo necesario para comenzar a mejorar tu entrenamiento</p>
            <p>Lo principal es iniciar con el registro.
                Puedes registrar una cuenta nueva si todavía no tienes. Sin embargo, lo más probable es que tengas
                alguna red social como google o facebook
                y prefieras iniciar sesión con alguna de ellas. No te preocupes, también puedes hacerlo y sólo debes
                hacer click en los botones correspondientes.
            </p>
            <div class="image-container-vertical">
                <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/information_page%2Flogin.png?alt=media&token=78a948c7-f3c2-481b-9c47-ad2b4a382ac2"
                    alt="Login">
            </div>
            <p>Una vez que hayas iniciado sesión, estarás en un instante en tu perfil y aquí podrás ver información
                sobre tu cuenta y tus rutinas. A la derecha posees opciones para compartir tu perfil,
                editar información o cerrar sesión.
            </p>
            <div class="image-container-horizontal">
                <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/information_page%2Fprofile_aside.png?alt=media&token=3a2cf65b-cefb-4a36-87d1-69d4fb08c4d4"
                    alt="Profile aside">
            </div>
            <p>
                A la izquierda, podrás ver tus rutinas. Si no tienes ninguna, puedes crear una nueva.
                Para ello, puedes seguir los siguientes pasos recomendados. Sin embargo, una vez te familiarices
                con la aplicación, puedes tener más libertad para crear tus propias rutinas.
            </p>
            <p>
                1. Crear una rutina nueva.
            </p>
            <p>
                2. Cambia el nombre de la rutina.
            </p>
            <p>
                3. Agrega una descripción a la rutina.
            </p>
            <p>
                4. Agrega ejercicios a la rutina.
            </p>
            <p>
                5. Cambia el nombre del ejercicio.
            </p>
            <p>
                6. Agrega series al ejercicio.
            </p>
            <p>
                7. Agrega información al las series como repeticiones, peso, tiempo y notas.
            </p>
            <p>
                8. Guarda la rutina.
            </p>
            <p>
                Una vez guardada, podrás ver la rutina en tu perfil y podrás compartirla con amigos, editarla o
                eliminarla si lo deseas.
                Además estará pública para que otros usuarios puedan verla y copiarla.
            </p>
            <div class="image-container-horizontal">
                <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/information_page%2Fprofile_routine.png?alt=media&token=d218f5e9-d3d3-4c8f-824d-2866d2d16239"
                    alt="Profile main">
            </div>
            <p>
                Hemos estado hablando sobre rutinas públicas, pero ¿cómo puedes verlas? Es muy sencillo,
                sólo debes ir a la sección de rutinas y podrás ver todas las rutinas públicas que han sido creadas
                por otros usuarios. Puedes copiarlas y llevarlas a tu perfil para editarlas a tu gusto, porque recuerda
                que cada cuerpo
                es diferente y lo que funciona para uno, no necesariamente funcionará para otro con el mismo
                peso, repeticiones y tiempo.
            </p>
            <p>
                Para copiar la rutina que te interesa, sólo debes hacer click en el primer botón de la derecha. Si
                deseas compartir
                la rutina puedes oprimir el segundo botón y si deseas ver la rutina en detalle, puedes hacer click en el
                nombre de la rutina.
            </p>
            <p>
                Recuerda que puedes utilizar el buscador para encontrar rutinas específicas y filtrar por nombre de alguna rutina, nombre de usuario o por ejercicios
            </p>
            <div class="image-container-horizontal">
                <img src="https://firebasestorage.googleapis.com/v0/b/gym-stats-e3823.appspot.com/o/information_page%2Froutines.png?alt=media&token=2632bcb0-9e41-4ac5-8d81-60aff6867cd0"
                    alt="Routines">
            </div>
            <p>
                Sácale el máximo provecho a la aplicación y mejora tu entrenamiento. Recuerda que la constancia es la clave
            </p>
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

    h1 {
        font-size: 3em;
        margin: 1em 0em;
    }


    .information {
        width: 90%;
        max-width: 1200px;

        p {
            font-size: 1.2em;
            margin: 1em 0em;
        }

        .image-container-vertical {
            display: flex;
            justify-content: center;
            width: 100%;

            img {
                border: 2px solid #ffffff;
                box-shadow: 0px 0px 5px 0px #ffffff;
                text-align: center;
                max-width: 500px;
                max-height: 500px;
                object-fit: contain;
                width: 100%;
                border-radius: 10px;
            }
        }

        .image-container-horizontal {
            display: flex;
            justify-content: center;
            width: 100%;

            img {
                border: 2px solid #ffffff;
                box-shadow: 0px 0px 5px 0px #ffffff;
                text-align: center;
                max-width: 1100px;
                object-fit: contain;
                width: 100%;
                border-radius: 10px;
            }
        }

    }

}
</style>