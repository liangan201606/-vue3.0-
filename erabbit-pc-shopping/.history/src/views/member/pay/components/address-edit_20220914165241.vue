<template>
  <XtxDialog title="添加收货地址" v-model:visible="dialogVisible">
    <div class="address-edit">
      表单
    </div>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'AddressEdit',
  setup () {
    const dialogVisible = ref(false)
    // 打开函数
    const open = () => {
      dialogVisible.value = true
    }
    return { dialogVisible, open }
  }
}
</script>
<style scoped lang="less">
.address-edit {

}
</style>