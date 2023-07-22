<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流栏 -->
    <Suspense>
      <template #default v-if="[3, 4, 5].includes(order.orderState)">
        <DetailLogistics :order="order"></DetailLogistics>
      </template>
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <OrderInfo :order="order"></OrderInfo>
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import { ref } from 'vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailStep from './detail-step.vue'
import DetailLogistics from './detail-logistics.vue'
import OrderInfo from './components/order-info'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailStep, DetailLogistics, OrderInfo },
  setup() {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then((data) => {
      data.result.countdown = 100000000
      data.result.orderState = 5
      order.value = data.result
      console.log(data.result)
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
