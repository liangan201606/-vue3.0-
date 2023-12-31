<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <!-- 商品简单信息组件 -->
          <GoodsSales :goodsId="goods.id"></GoodsSales>
        </div>
        <div class="spec">
          <!-- 商品名字以及配送组件 -->
          <GoodsName :goods="goods"></GoodsName>
          <!-- 商品规格组件 -->
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <!-- 数量选择组件 -->
          <XtxNumbox label="数量" v-model="count" :max="goods.inventory"></XtxNumbox>
          <!-- 按钮组件 -->
          <XtxButton @click="insertCart()" type="primary" style="margin-top: 20px">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs></GoodsTabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <!-- 热搜榜 24小时 -->
          <GoodsHot :type="1"></GoodsHot>
          <!-- 周 -->
          <GoodsHot :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods.tabs.vue'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { ref, watch, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { findGoods } from '@/api/product'
import Message from '@/components/library/Message'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup() {
    // 1.获取商品详情，进行渲染
    const goods = useGoods()
    const changeSku = (sku) => {
      // 修改商品的原价和库存信息
      // console.log(sku)
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      // 记录选择后的sku，可能有数据， 可能没有数据{}
      currSku.value = sku
    }
    // 选择的数量
    const count = ref(1)
    // 提供goods数据给后代组件使用
    provide('goods', goods)
    // 加入购物车
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      // 约定加入购物车字段 与后端保持一致
      // 选择商品完整规格
      // id skuId name picture price nowPrice count attrsText selected stock isEffective
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, oldPrice, price, mainPictures } = goods.value
        store
          .dispatch('car/insertCart', {
            skuId,
            attrsText,
            stock,
            id,
            name,
            price: oldPrice,
            nowPrice: price,
            picture: mainPictures[0],
            // 是否选中
            select: true,
            // 是否有效
            isEffective: true,
            count: count.value
          })
          .then(() => {
            Message({ type: 'success', text: '添加购物车成功' })
          })
        // console.log('1')
      } else {
        Message({ text: '请选择完整规格' })
      }
    }
    return { goods, changeSku, count, insertCart }
  }
}
// 获取商品详情
// 抽离，防止setup中的逻辑太多
const useGoods = () => {
  // 出现路由地址商品发生变化，但是不会重新初始化组件 使用watch
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          console.log(data)
          // 让商品数据为null 让后使用v-if的组件可以重新销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
