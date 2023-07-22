<!-- 个人中心首页组件 -->
<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="item in HistoryGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>
<script>
import HomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
import { ref } from 'vue'
import { findCollect, findbrowseHistory, findCheckoutInfo } from '@/api/order'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodsItem
  },
  setup() {
    const collectGoods = ref([])
    findCollect({
      page: 1,
      pageSize: 4
    }).then((data) => {
      // console.log(data.result)
      collectGoods.value = data.result.items
    })
    const List = ref([])
    findCheckoutInfo().then((data) => {
      console.log(data.result.userAddresses)
      console.log(List.value)
      List.value = data.result.userAddresses
    })
    const HistoryGoods = ref([])
    findbrowseHistory({
      page: 1,
      pageSize: 4
    }).then((data) => {
      // console.log(data.result)
      HistoryGoods.value = data.result.items
    })
    return { collectGoods, HistoryGoods, List }
  }
}
</script>
<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
