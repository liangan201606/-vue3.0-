<template>
  <div class="detail-step">
    <XtxSteps :active="order.orderState===6?1:order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.createTime"  />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货"  :desc="order.evaluationTime" />
      <XtxStepsItem title="订单完成" />
    </XtxSteps>
  </div>
</template>

<script>
export default {
  name: 'DetailStep',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped></style>
