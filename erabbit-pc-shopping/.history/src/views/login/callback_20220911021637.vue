<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <div class="unbind" v-if="isBind">
      <div class=""></div>
    </div>
  </section>
  <section class="container">
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <!-- 已有小兔鲜账号，请绑定手机 -->
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <!-- 没有小兔鲜账号，请完善资料 -->
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import { ref } from 'vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import Message from '@/components/library/Message'
export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup() {
    const hasAccount = ref(true)
    // 名字
    const nickname = ref(null)
    // 头像
    const avatar = ref(null)
    // 首先：默认认为已经注册且已经绑定
    // 通过qq的API获取openId(第三方标识符)然后去进行登录
    // 如果成功：登录成功
    // 如果失败：该QQ未和小兔仙进行绑定(有账号没有绑定QQ,没有账号)
    // 假设已经绑定，默认会去做一次登录，如果登录失败证明未绑定。
    const isBind = ref(true)
    // 判断QQ是否登录
    if (QC.Login.check()) {
      // 第三方标识
      QC.Login.getMe((openId) => {
        // 请求小兔鲜后台
        userQQLogin(openId)
          .then((date) => {
            // 1. 存储用户信息
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            // 登录成功data是用户信息
            Message({ type: 'success', text: 'QQ登录成功' })
          })
          .catch((e) => {
            // 代表：使用qq登录失败===>1. 没绑定小兔鲜帐号  2. 没有小兔鲜帐号
            isBind.value = false
          })
      })
    }
    return { hasAccount, nickname, avatar, isBind }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
