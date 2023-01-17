import {createApp} from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'

import './asset/font.scss'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')