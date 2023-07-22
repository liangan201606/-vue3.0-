<template>
  <div>
    App
    <!-- 数据测试 -->
    {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser',{account:'pink'})">设置用户信息</button>
  </div>
</template>

<script>
export default {
  name:
}
</script>

<style></style>
