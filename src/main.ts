import { createApp } from 'vue'
import MyLib from './lib/frontend-library/src/index'
import Antd from 'ant-design-vue'
import './lib/frontend-library/src/assets/main.css'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'

createApp(App).use(Antd).use(MyLib).mount('#app')
