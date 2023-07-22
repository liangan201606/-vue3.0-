<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <!-- <p>{{orderStatus[order.orderState].label}}</p> -->
    </div>
    <div class="info">
      <!-- <p>订单编号：{{order.id}}</p> -->
      <!-- <p>下单时间：{{order.createTime}}</p> -->
    </div>
    <div class="btn">
    </div>
    <Teleport to="#model">
      <OrderCancel ref="orderCancelCom"/>
    </Teleport>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import OrderCancel from './order-cancel'
// import { useCancel, useConfirm } from '../index'
export default {
  name: 'OrderDetailAction',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    OrderCancel
  },
  setup () {
    return { orderStatus }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
