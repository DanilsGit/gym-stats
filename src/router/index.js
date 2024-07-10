// rutas
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RoutinesPage from '../views/RoutinesPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import InformationPage from '../views/InformationPage.vue'
import PublicRoutinePage from '../views/PublicRoutinePage.vue'
import PublicProfile from '../views/PublicProfile.vue'
import { useAuthStore } from '../store/auth'
import { computed } from 'vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile/:id',
        name: 'public-profile',
        component: PublicProfile,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/routines',
        name: 'routines',
        component: RoutinesPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/public-routine/:id',
        name: 'public-routine',
        component: PublicRoutinePage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/information',
        name: 'information',
        component: InformationPage,
        meta: {
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated).value;

    // Si el usuario está intentando acceder a login pero ya está autenticado, redirige a profile
    if (to.name === 'login' && isAuthenticated) {
        next('/profile');
    } else if (to.meta.requiresAuth && !isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a login
        next('/login');
    } else {
        // En cualquier otro caso, simplemente continúa con la navegación
        next();
    }
});

export default router