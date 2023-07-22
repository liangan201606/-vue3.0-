// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/cactegory.js'
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合 依赖topCategory重新设置 保证初始化主要数据 不至于白屏
      list: topCategory.map((item) => ({ name: item }))
    }
  },
  // 修改分类数据
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setList(state, payload) {
      // payload拿到的分类合集
      state.list = payload
    },
    // 定义show和hide函数 控制当前分类的二级分类显示和隐藏
    show(state, id) {
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = true
      console.log(currCat);
    },
    hide(state, id) {
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList({ commit }) {
      // 获取分类数据 发起请求获取数据
      const data = await findAllCategory()
      // 给每个分类加上控制二级分类显示隐藏的数据
      data.result.forEach((top) => {
        // 给一级分类添加open属性
        top.open = false
      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
