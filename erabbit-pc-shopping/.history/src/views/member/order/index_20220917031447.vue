<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem v-for="order in orderList" :key="order.id" :order="order"/>
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
    const changeTab = (tab) => {
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
      orderList.value = data.result.items
    })
    return { activeName, changeTab, orderStatus, orderList }
  }
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
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
