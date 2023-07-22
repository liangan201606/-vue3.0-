import request from '@/utils/request'

// 账号登录
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
// 获取验证码
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}
// 手机号登录
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
// 第三方登录 unionId第三方标识 source注册来源
export const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}
// 第三方登录 yanzheng
