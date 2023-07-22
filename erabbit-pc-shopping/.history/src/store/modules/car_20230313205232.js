// 购物车状态
// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective

import { getNewCartGoods, mergeCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from '@/api/cart'
// import { mergeCart } from '@/api/cart'
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
export default {
  namespaced: true,
  state: () => {
    return {
      // 购物车中所有商品列表
      list: []
    }
  },
  getters: {
    // 计算属性
    // 有效商品列表
    validList(state) {
      // stock库存大于0 商品有效标识isEffective
      return state.list.filter((goods) => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      // Getter 也可以接受其他 getter 作为第二个参数：
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter((goods) => goods.stock <= 0 && !goods.isEffective)
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter((goods) => goods.selected)
    },
    // 已选商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  },
  mutations: {
    // 加入购物车
    insertCart(state, payload) {
      // 约定加入购物车字段必须和后端保持一致 payload字段
      // id skuId name picture price nowPrice count attrsText selected stock isEffective
      // 插入数据规则：
      // 1.先找是否有相同商品
      // 2.如果有相同商品， 查询它的数量，累加到payload上面 在保存到新位置上面,原来的商品需要删除
      // 3.如果没有相同商品 保存在最新位子即可
      const sameIndex = state.list.findIndex((goods) => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除商品
        state.list.splice(sameIndex, 1)
        // 追加新的
        state.list.unshift(payload)
      } else {
        // 追加新的
        state.list.unshift(payload)
      }
    },
    // 修改购物车商品信息
    updateCart(state, goods) {
      // goods商品信息：nowPrice stock isEffective
      // goods商品字段不固定，有哪些字段就修改哪些字段，字段的值合理才能修改
      // goods对象必须有值
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除商品
    deleteCart(state, skuId) {
      const indext = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(indext, 1)
    },
    // 设置购物车列表 list为空实现合并后清空本地
    setCartList(state, list) {
      state.list = list
    }
  },
  actions: {
    // 合并购物车
    async mergeCart(ctx) {
      // 准备合并参数 存储token后调用合并API接口函数进行购物合并
      const cartList = ctx.state.list.map((goods) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setCartList', [])
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 线上
          findCartList().then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 本地
          // 同时发起请求（有几个商品发几个请求)等所有请求成功，一并修改本地数据
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          // Promise.resolve() Promise.reject() new Promise()创建Promise对象
          // 传参时promise数组
          const promiseArr = ctx.state.list.map((goods) => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then((dataList) => {
            // 并列发送多个请求
            console.log(dataList)
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          })
        }
      })
    },
    // 删除购物车的商品
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          deleteCart([payload])
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 批量删除选中商品
    batchDeleteCart(ctx, isclear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 如果要做批量删除的列表无数据，阻止提示下没有你要删除的商品。
          // 清空失效商品：目前传人[]数据，会清空说有的商品包括有效商品（后台BUG）
          const ids = ctx.getters[isclear ? 'invalidList' : 'selectedList'].map((item) => item.skuId)
          deleteCart(ids)
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
          ctx.getters[isclear ? 'invalidList' : 'selectedList'].forEach((item) => {
            ctx.commit('deleteCart', item.skuId)
          })
        }
        resolve()
      })
    },
    // 修改购物车商品信息
    updateCart(ctx, payload) {
      // payload 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          updateCart({ skuId: payload.skuId, selected: payload.selected, count: payload.count })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters.validList.map((item) => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.getters.validList.forEach((goods) => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改规格
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          // 1. 获取原先商品的数量
          // 2. 删除原先商品
          // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
          // 4. 更新列表
          const oldGoods = ctx.state.list.find((item) => item.skuId === oldSkuId)
          deleteCart([oldSkuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 未登录
          // 1.首先应该导出旧的商品信息
          const oldGoods = ctx.state.list.find((item) => item.skuId === oldSkuId)
          // 2.删除旧的商品信息skuId已改变
          ctx.commit('deleteCart', oldSkuId)
          // 3.合并一条新的商品信息 根据新的sku 和旧的商品信息合成
          const { skuId, price: nowPrice, specsText: attrsText, inventory: stock } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock } // 后面的会将前的部分覆盖
          // 4. 去插入即可
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    }
  }
}
