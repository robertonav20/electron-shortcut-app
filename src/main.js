import Vue from 'vue'
import Antd, {notification} from 'ant-design-vue';
import router from './router'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css';
import './asset/font.scss'

Vue.config.productionTip = false;

Vue.use(Antd);

notification.config({
    placement: "bottomRight"
})

const app = new Vue({
    router,
    render: h => h(App)
})

app.$mount("#app")

console.log('App loaded successfully')