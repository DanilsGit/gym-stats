// Creación de la aplicación Vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// Import Firebase
import { initializeApp } from "firebase/app";

// Import Amplify
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

// Import Pinia
import { createPinia } from 'pinia'

// Configuración de Amplify
Amplify.configure(awsExports)

// Configuración de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicialización de Firebase
initializeApp(firebaseConfig);

// Configuración de Pinia
const pinia = createPinia()

// Creación de la aplicación Vue
createApp(App).use(pinia).use(router).mount('#app')

