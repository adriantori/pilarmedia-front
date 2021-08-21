import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8000/api/'
app.use(router)
app.mount('#app')