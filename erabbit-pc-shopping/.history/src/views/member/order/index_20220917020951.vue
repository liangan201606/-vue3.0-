<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem/>
    </div>
    <!-- <div v-else class="loading"></div> -->
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { ref } from 'vue'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/order'
import { reactive, ref } from 'vue'
export default {
  name: 'MemberOrder',
  components: { OrderItem },
  setup() {
    const activeName = ref('all')
    const changeTab = (name) => {
      console.log(name)
    }
    // 查询订单参数
    const req
    // 查询订单列表
    // 查询订单
    return { activeName, changeTab, orderStatus }
  }
}
</script>

<style scoped lang="less">
</style>
