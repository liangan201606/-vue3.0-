<!-- 绑定账号组件 -->
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>

<script>
import { ref, reactive, onUnmounted } from 'vue'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
import { useIntervalFn } from '@vueuse/core'
import { userQQLoginMsg } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QC from 'qc'
export default {
  name: 'CallbackBind',
  // 1.准备下信息：unionId qq头像 qq昵称
  // 2.完成表单校验
  // 3.发送验证码（校验手机号码，定义api， 调用，完成倒计时）
  // 4.绑定成功（登录成功）
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup() {
    const nickname = ref('null')
    const avatar = ref('null')
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res) => {
        // console.log(res)
        avatar.value = res.data.figureurl_1
        nickname.value = res.data.nickname
      })
    }
    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null
    })
    // 校验规则对象
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }
    // 短信校验
    const formCom = ref(null)
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
        await userQQLoginMsg(form.mobile)
        Message({ type: 'success', text: '发送成功' })
        // 发送成功时 开启定时器
        resume()
        time.value = 60
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFielError(字段，错误信息)
        formCom.value.setFielError('mobile', valid)
      }
    }
    // 立即绑定
    const store = useStore()
    const router = useRouter()
    return { nickname, avatar, form, schema: mySchema, send }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
