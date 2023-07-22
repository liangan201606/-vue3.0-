<template>
  <div>
    App
    <button @click="fn">测试请求函数</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup() {
    const fn = () => {
      request('/member/profile', 'post', { a: 10 })
    }
    return { fn }
  }
}
</script>

<style></style>
