import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1.重置样式的库
import 'normalize.css'
createApp(App).use(store).use(router).mount('#app')
