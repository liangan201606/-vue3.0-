<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin"> <i class="iconfont icon-user"></i> 使用账号登录 </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{ error: errors.account }" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />
            {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{ error: errors.password }" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />
            {{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{ error: errors.mobile }" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />
            {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{ error: errors.code }" v-model="form.code" name="code" type="text" placeholder="请输入验证码" />
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />
            {{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />
          {{ errors.isAgree }}
        </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import schema from '@/utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import Message from '@/components/library/Message'
import { userAccountLogin } from '@/api/user'
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // vee-validate校验基本步骤
    // 1.导入Form Field组件 将form 和 input 进行替换 需要加上name用来指定将来校验规则函数
    // 2.Field需要进行数据绑定 字段名称最好和后台接口需要一致
    // 3.定义Field的name属性指定校验规则函数， Form的validation-schema接受定义好的验证规则
    // 4. 自定义组件需要校验必须先支持v-model 然后Field使用as指定为组件名称
    // 校验规则对象
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    // 切换表单元素，还原数据和清除校验效果
    // 首先需要自己手动清除数据，然后使用Form 组件提供 resetForm 方法对表单进行清除校验结果
    // 切换表单元素，还原数据和清除校验效果
    const formCom = ref(null)
    // 监听isMsgLogin
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
      // 如果没有消费Field组件 之前的校验结果不会消耗
      formCom.value.resetForm()
    })
    // 整体表单校验
    const login = () => {
      // 需要在点击登录的时候对整体表单进行校验
      // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
      formCom.value.validate().then((vaild) => {
        // console.log(vaild)
        // 1.准备一个API做账号登录
        // 2.调用API函数
        // 3.成功.跳转到来源页或首页
        // 4.失败.消息提示
        if(valid) {
          userAccountLogin({form.account)
        }
      })
      // Message({ type: 'error', text: '登录失败' })
    }
    return { isMsgLogin, form, schema: mySchema, login, formCom }
  }
}
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
