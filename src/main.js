import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'  // ← AGREGAR ESTA LÍNEA

import './styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
