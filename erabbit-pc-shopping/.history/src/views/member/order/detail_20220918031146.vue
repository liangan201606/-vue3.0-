<template>
  <div class="order-detail-page">
    <!-- 操作栏 -->
    <DetailAction />
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import { ref } from 'vue'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction },
  setup() {
    const order = ref(null)
    find
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
