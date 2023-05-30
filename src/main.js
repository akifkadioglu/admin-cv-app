import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { routeName } from './router/routeName';
import { fetchFire } from './firebase/functions'


let app = createApp(App)
app.config.globalProperties.fetchFire = fetchFire
app.config.globalProperties.routeName = routeName

app
    .use(router)
    .use(mdiVue, {
        icons: mdijs
    })
    .mount('#app')
