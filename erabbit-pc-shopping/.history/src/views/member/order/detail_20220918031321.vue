<template>
  <div class="order-detail-page">
    <!-- 操作栏 -->
    <DetailAction :order=/>
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import { ref } from 'vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction },
  setup() {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
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
