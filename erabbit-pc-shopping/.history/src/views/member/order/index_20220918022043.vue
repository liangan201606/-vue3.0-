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
      <OrderItem @on-cancel="handlerCancel" @on-delete="handlerDelete" @on-confirm="handlerConfirm" @on- v-for="order in orderList" :key="order.id" :order="order" />
    </div>
    <!-- <div v-else class="loading"></div> -->
  </div>
  <!-- 分页组件 -->
  <!-- 取消原因组件 -->
  <OrderCancel ref="OrderCancel"></OrderCancel>
  <OrderLogistics/>
  <!-- 物流组件 -->
</template>

<script>
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item'
import OrderLogistics from './components/order-logistics'
import { findOrderList, deleteOrder, receiptOrder } from '@/api/order'
import { reactive, ref, watch } from 'vue'
import OrderCancel from './components/order-cancel.vue'
import Message from '@/components/library/Message'
import confirm from '@/components/library/confirm'
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
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
      // console.log(tab)
      reqParams.orderState = tab.index
      reqParams.page = 1
    }
    // 查询订单列表
    const orderList = ref([])
    const getOrderList = () => {
      loading.value = true // 加载效果
      findOrderList(reqParams).then((data) => {
        orderList.value = data.result.items
        total.value = data.result.counts // 数据的总条数
        loading.value = false // 加载完成
      })
    }
    // 查询订单 监听reqParam是否发生变化
    watch(
      reqParams,
      () => {
        getOrderList()
      },
      { immediate: true }
    )
    // 删除订单
    const handlerDelete = (order) => {
      confirm({ text: '您确认删除该条订单吗？' })
        .then(() => {
          deleteOrder([order.id]).then(() => {
            Message({ text: '删除订单成功', type: 'success' })
            getOrderList() // 更新列表
          })
        })
        .catch((e) => {})
    }
    return { activeName, changeTab, orderStatus, orderList, loading, total, reqParams, ...useCancel(), handlerDelete, ...useConfirm() }
  }
}
// 取消订单逻辑
const useCancel = () => {
  // 组件实例
  const OrderCancel = ref(null)
  const handlerCancel = (order) => {
    // 打开对话框 传入订单详情
    OrderCancel.value.open(order)
  }
  return { handlerCancel, OrderCancel }
}
// 确认收货
const useConfirm = () => {
  const handlerConfirm = (order) => {
    confirm({ text: '请确认收货' })
      .then(() => {
        receiptOrder(order.id).then(() => {
          Message({ typs: 'success', text: '确认收货成功' })
          // 待收货 ---> 待评价
          order.orderState = 4
        })
      })
      .catch((e) => {})
  }
  return { handlerConfirm }
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
