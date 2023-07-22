<template>
  <div class="checkout-address">
    <div class="text">
      <div class="none" v-if="!showAddress">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>
          {{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}</li>
        <li><span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}</li>
      </ul>
      <a href="javascript:;" v-if="showAddress" @click="open">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit()" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件-切换收获地址 -->
  <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
    <div class="text item" v-for="item in list" :key="item.id" @click="selectedAddress = item" :class="{ active: selectedAddress && item.id === selectedAddress.id }">
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
      </ul>
    </div>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="visibleDialog = false">取消</XtxButton>
      <XtxButton type="primary" @click="confirmAddress()">确认</XtxButton>
    </template>
  </XtxDialog>
  <!-- 添加编辑组件-添加收获地址 -->
  <AddressEdit ref="addressEdit" @on-success="successHandler"></AddressEdit>
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 收获地址列表
    list: {
      tyep: Array,
      default: () => []
    }
  },
  // 1.在拥有更元素的组件中， 触发自定义使用 有没有emits选项无所谓
  // 2.如果你的组件渲染的代码片段：vue3.0规范，需要emits中申明你所触及的自定义事件
  // 3.提倡：你触发自定义事件 需要使用emits选项申明下
  emits: ['change'],
  setup(props, { emit }) {
    // 1.找到默认收获地址
    // 2.没有默认收获地址 使用第一条收获地址
    // 3.如果没有 显示请添加一条收货地址
    const showAddress = ref(null)
    // 取出默认的收获地址
    if (props.list.length) {
      const defaultAddress = props.list.find((item) => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // 加上一个注释忽略下面代码的eslint
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }
    // 默认通知父组件（结算组件）收获地址的ID
    emit('change', showAddress.value && showAddress.value.id)
    // 显示隐藏
    const visibleDialog = ref(false)
    // 记录选择的地址
    const selectedAddress = ref(null)
    const openDialog = () => {
      visibleDialog.value = true
      // 数据使用完毕置空
      selectedAddress.value = null
    }
    const confirmAddress = () => {
      // 显示的地址换成已经选中的地址
      // 把选中地址的ID通知父组件
      showAddress.value = selectedAddress.value
      emit('change', selectedAddress.value && selectedAddress.value.id)
      // 关闭对话框
      visibleDialog.value = false
    }
    const open = () => {
      console.log('1')
    }
    // 打开添加收货地址组件
    // 获取组件实例
    const addressEdit = ref(null)
    const openAddressEdit = () => {
      // 调用组件的open()方法
      addressEdit.value.open()
    }
    // 成功处理函数
    const successHandler = (formData) => {
      // 如果是添加：往list中追加一条
      const json = JSON.stringify(formData) 
      // eslint-disable-next-line vue/no-mutating-props
      props.list.unshift(JSON.parse(json))
    }
    return { showAddress, visibleDialog, open, openDialog, selectedAddress, confirmAddress, openAddressEdit, addressEdit, successHandler }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
