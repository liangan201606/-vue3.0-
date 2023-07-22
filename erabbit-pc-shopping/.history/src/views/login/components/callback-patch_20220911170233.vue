<!-- 完善信息组件 -->
<template>
  <Form class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field :class="{ err: errors.account }" name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{ err: errors.mobile }" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div v-if="errors.account" class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{ err: errors.code }" name="code" class="input" type="text" placeholder="请输入验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div v-if="errors.code" class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Feild :class="{ err: errors.password }" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Feild :class="{ err: errors.rePassword}" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref, onUnmounted } from 'vue'
import schema from '@/utils/vee-validate-schema'
// import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
// import { useIntervalFn } from '@vueuse/core'
// import Message from '@/components/library/Message'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 1.表单校验多个校验： 用户名是否存在， 再次输入密码是否一致
    // 2.发送短信验证码 发送接口API定义
    // 3.完善信息

    // 表单数据对象
    const form = reactive({
      mobile: null,
      account: null,
      password: null,
      code: null,
      rePassword: null
    })
    // 校验规则对象
    const mySchema = {
      account: schema.accountApi,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      rePassword: schema.rePassword
    }
    return { form, mySchema }
  }
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
