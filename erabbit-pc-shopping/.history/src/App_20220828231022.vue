<template>
  <div>
    App
    {{ $store.state.user.profile.account }}
    <button @click="$store.cimmit('user/setUser',{account:'pink'})">设置用户信息</button>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
