import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import store from "./store";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css ";

const app = createApp(App);

// Hacer la librería UI disponible en el proyecto
app.use(PrimeVue);
app.use(router);
app.use(store);

app.mount('#app')
