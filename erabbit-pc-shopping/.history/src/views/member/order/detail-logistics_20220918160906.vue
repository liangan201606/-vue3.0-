<template>
  <div class="detail-logistics">
    <p>
      <span>{{ list[0].text }}</span>
      <span>{{ list[0].time }}</span>
    </p>
    <a href="javascript:;">查看物流</a>
  </div>
  <!-- 查看物流组件 -->
  <OrderLogistics ref="logisticsOrderCom" />
</template>
<script>
import { logisticsOrder } from '@/api/order'
import OrderLogistics from './components'
import { ref } from 'vue'
export default {
  name: 'DetailLogistics',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  async setup(props) {
    // console.log(props.order.id)
    const data = await logisticsOrder(props.order.id)
    const list = ref(data.result.list)
    return { list }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
