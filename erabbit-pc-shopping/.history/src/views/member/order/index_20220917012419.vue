<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <XtxTabs v-model="activeName" v-show="activeName === name">
      <XtxTabsPanel label="选项卡1" name="first">内容1</XtxTabsPanel>
      <XtxTabsPanel label="选项卡2" name="first">内容2</XtxTabsPanel>
      <XtxTabsPanel label="选项卡3" name="first">内容3</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MemberOrder',
  setup() {
    
  }
}
</script>

<style scoped lang="less"></style>
