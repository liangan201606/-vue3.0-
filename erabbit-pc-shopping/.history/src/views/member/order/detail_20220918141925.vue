<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流栏 -->
    <Suspense></Suspense>
    <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order"></DetailLogistics>
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import { ref } from 'vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailStep from './detail-step.vue'
import DetailLogistics from './detail-logistics.vue'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailStep, DetailLogistics },
  setup() {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then((data) => {
      order.value = data.result
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
