import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import car from './modules/car'
import category from './modules/category'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    car,
    category
  },
  // 配置插件
  plugins: [
    createPersistedstate({
      // key是存储数据的键名
      // 默认是存储在localStorage中
      key: 'erabbit-pc-shopping',
      // 
      paths: ['user', 'car']
    })
  ]
})
