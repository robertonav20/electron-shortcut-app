import Antd from 'ant-design-vue';
import router from './router'
import {createApp} from 'vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css';
import './asset/font.scss'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')