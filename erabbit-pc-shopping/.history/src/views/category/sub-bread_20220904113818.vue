<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="/">电器</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem>空调</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup(){
    // 通过计算属性从vuex中获取顶级和二级类目的信息
    // 对象：{top:{id,name},sub:{id,name}}
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      let cate = {}
      // 完成获取数据逻辑
      store.state.category.list.forEach( => {

      });
      return cate
    })
    return { category}
  }
}
</script>

<style></style>
