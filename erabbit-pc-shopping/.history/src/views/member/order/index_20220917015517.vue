<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{ item.label }}</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { ref } from 'vue'
import OrderItem from './components/order-item'
export default {
  name: 'MemberOrder',
  setup() {
    const activeName = ref('all')
    const changeTab = (name) => {
      console.log(name)
    }
    return { activeName, changeTab, orderStatus }
  }
}
</script>

<style scoped lang="less"></style>
