<template>
  <div class="member-order">
    <!-- 体验jsx的用法 -->
    <XtxTabs v-model="active">
      <XtxTabsPanel label="选项卡1" name="first">内容1</XtxTabsPanel>
      <XtxTabsPanel label="选项卡2" name="first">内容2</XtxTabsPanel>
      <XtxTabsPanel label="选项卡3" name="first">内容3</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
export default {
  name: 'MemberOrder'
}
</script>

<style scoped lang="less"></style>
