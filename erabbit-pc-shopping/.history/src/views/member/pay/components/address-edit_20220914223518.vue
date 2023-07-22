<template>
  <XtxDialog title="添加收货地址" v-model:visible="visibleDialog">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity :fullLocation="formData.fullLocation" @change="changeCity" placeholder="请选择所在地区" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input v-model="formData.address" class="input" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="visibleDialog = false">取消</XtxButton>
      <XtxButton type="primary" @click="submit()">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { reactive, ref } from 'vue'
import { addAddress } from '@/api/order.js'
import Message from '@/components/library/Message'
export default {
  name: 'AddressEdit',
  setup(props, { emit }) {
    const visibleDialog = ref(false)
    // 定义一个open函数，做为打开对话框函数
    const open = (address) => {
      visibleDialog.value = true
      // 如果修改 编辑
      if(address.id){
        for (const key in formData) {
          formData[key] = add
        }
      } else {
        // 如果添加 清空表单
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1
          } else {
            formData[key] = null
          }
        }
      }
    }
    // 表单数据
    const formData = reactive({
      id: null,
      receiver: null,
      contact: null,
      provinceCode: null,
      cityCode: null,
      countyCode: null,
      address: null,
      postalCode: null,
      addressTags: null,
      isDefault: 1,
      // 城市组件显示文字（完整行政区地址）
      fullLocation: null
    })
    // 城市选中
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode
      formData.cityCode = result.cityCode
      formData.countyCode = result.countryCode
      formData.fullLocation = result.fullLocation
    }
    // 提交操作(修改)
    const submit = () => {
      // console.log(formData.provinceCode)
      // console.log(formData.countyCode)
      // 1.省略校验
      // 2.发送请求
      addAddress(formData).then((data) => {
        // // 提示
        Message({ type: 'success', text: '添加收货地址成功' })
        // 地址id
        formData.id = data.result.id
        // 关闭
        visibleDialog.value = false
        // 给结算组件的地址列表加一条/该一条 触发自定事件
        emit('on-success', formData)
      })
    }
    return { visibleDialog, open, formData, changeCity, submit }
  }
}
</script>
<style scoped lang="less">
.address-edit {
  .xtx-dialog {
    :deep(.wrapper) {
      width: 780px;
      .body {
        font-size: 14px;
      }
    }
  }
  .xtx-form {
    padding: 0;
    input {
      outline: none;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>
