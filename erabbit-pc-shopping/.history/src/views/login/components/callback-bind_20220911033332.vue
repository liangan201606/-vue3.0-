<!-- 绑定账号组件 -->
<template>
  <Form class="xtx-form" ref="formCom" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err:errors.mobile}" v-model="form.mobile" name="mobile" class="input" type="text" placeholder="绑定的手机号" />
        <!-- <input class="input" type="text" placeholder="绑定的手机号" /> -->
      </div>
      <div v-if="errors.mobile" class="error">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err:errors.code}" v-model="form.code" name="code" class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">
          {{time===0?'发送验证码':`${time}秒后发送`}}
        </span>
      </div>
      <div v-if="errors.code" class="error">{{errors.code}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="login()">立即绑定</a>
  </Form>
</template>

<script>
import { ref, reactive, onUnmounted } from 'vue'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
import { Form, Field } from 'vee-validate'
import { useIntervalFn } from '@vueuse/core'
import { userQQLoginMsg, userQQBindLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QC from 'qc'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
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
  setup(props) {
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
    const login = async () => {
      const valid = await formCom.value.validate()
      if (valid) {
        userQQBindLogin({ unionId: props.unionId, ...form })
          .then((data) => {
            // 登录成功data是用户信息
            // 1. 存储用户信息
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl)
            // 3. 成功提示
            Message({ type: 'success', text: 'QQ登录成功' })
          })
          .catch((e) => {
            Message({ type: 'error', text: 'QQ绑定失败' })
          })
      }
    }
    return { nickname, avatar, form, schema: mySchema, send, login }
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
