<!-- 完善信息组件 -->
<template>
  <Form class="xtx-form" :validation-schema="mySchema" v-slot="{ errors }" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field :class="{ err: errors.account }" name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{ err: errors.mobile }" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div v-if="errors.account" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{ err: errors.code }" name="code" class="input" type="text" placeholder="请输入验证码" />
        <span @click="send()" class="code">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{ err: errors.password }" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{ err: errors.rePassword }" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div v-if="errors.rePassword" class="error">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive } from 'vue'
import schema from '@/utils/vee-validate-schema'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
    // 短信验证码
    const time = ref(0)
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) {
          pause() // 销毁定时器
        }
      },
      1000,
      false
    )
    onUnmounted(() => {
      pause()
    })
    const send = async () => {
      // 校验手机号码是否符合规则
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        await userQQPatchCode(form.mobile)
        Message({ type: 'success', text: '发送成功' })
        // 发送成功时 开启定时器
        resume()
        time.value = 60
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFielError(字段，错误信息)
        formCom.value.setFielError('mobile', valid)
      }
    }
    return { form, mySchema, send, time }
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
