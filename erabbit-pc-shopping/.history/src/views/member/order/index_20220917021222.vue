<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem :orderList/>
    </div>
    <!-- <div v-else class="loading"></div> -->
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
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
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 查询订单列表
    const orderList = ref([])
    // 查询订单
    findOrderList(reqParams).then((data) => {
      orderList.value = data.result
    })
    return { activeName, changeTab, orderStatus, orderList }
  }
}
</script>

<style scoped lang="less"></style>
