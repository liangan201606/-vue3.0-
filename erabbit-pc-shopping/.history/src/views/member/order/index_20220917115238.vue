<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem @on-cancel="handlerCancel" v-for="order in orderList" :key="order.id" :order="order" />
    </div>
    <!-- <div v-else class="loading"></div> -->
  </div>
  <!-- 分页组件 -->
  <!-- 取消原因组件 -->
  <OrderCancel ref="OrderCancel"></OrderCancel>
</template>

<script>
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/order'
import { reactive, ref, watch } from 'vue'
import OrderCancel from './components/order-cancel.vue'
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel },
  setup() {
    const activeName = ref('all')
    const loading = ref(true)
    const total = ref(0)
    // 查询订单参数
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 条件查询
    const changeTab = (tab) => {
      // 此时：tab.index 就是订单的状态
      console.log(tab)
      reqParams.orderState = tab.index
      reqParams.page = 1
    }
    // 查询订单列表
    const orderList = ref([])
    // 查询订单 监听reqParam是否发生变化
    watch(
      reqParams,
      () => {
        loading.value = true // 加载效果
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items
          total.value = data.result.counts // 数据的总条数
          loading.value = false // 加载完成
        })
      },
      { immediate: true }
    )
    return { activeName, changeTab, orderStatus, orderList, loading, total, reqParams, ...useCancel() }
  }
}
// 取消订单逻辑
const useCancel = () => {
  const OrderCancel = ref(null)
  const handlerCancel = (order) => {
    
  }
  return { handlerCancel, OrderCancel }
}
</script>

<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
