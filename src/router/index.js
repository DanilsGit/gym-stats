// rutas
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RoutinesPage from '../views/RoutinesPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import InformationPage from '../views/InformationPage.vue'
import SharedRoutinePage from '../views/SharedRoutinePage.vue'
import { useAuthStore } from '../store/auth'

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
        path: '/routines',
        name: 'routines',
        component: RoutinesPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/shared-routine',
        name: 'shared-routine',
        component: SharedRoutinePage,
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
    const needsAuth = to.meta.requiresAuth;
    const isAuthenticated = authStore.isAuthenticated;

    if (needsAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }

    if (to.name === 'login' && isAuthenticated) {
        next('/profile');
    }

});

export default router