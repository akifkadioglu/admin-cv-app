import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { routeName } from './router/routeName';
import { fetchFire } from './firebase/functions'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


let app = createApp(App)
app.config.globalProperties.fetchFire = fetchFire
app.config.globalProperties.routeName = routeName

app
    .use(router)
    .use(mdiVue, {
        icons: mdijs
    })
    .use(CKEditor, {
        editor: ClassicEditor,
        config: {
            mediaEmbed: {
                previewsInData: true
            }
        }
    })
    .mount('#app')
