<template>
  <div class="detail-step">
    <XtxSteps :active="order.orderState===6?1:order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="2021-03-18 02:11:47" />
      <XtxStepsItem title="商品发货" :desc="2021-03-18 02:11:47" />
      <XtxStepsItem title="确认收货" :desc="2021-03-18 02:11:47" />
      <XtxStepsItem title="订单完成" desc="2021-03-18 02:11:47" />
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
