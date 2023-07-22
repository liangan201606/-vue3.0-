<template>
  <div>
    App
    <button @click="fn">测试请求函数</button>
  </div>
</template>

<script>
  import
export default {
  name: 'App',
  setup() {
    const fn = () => {
      // 请求测试
      request('//member/profile','get',{a:10})
    }
    return { fn }
  }
}
</script>

<style></style>
