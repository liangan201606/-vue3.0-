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
// 第三方登录 验证码
export const userQQLoginMsg = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}
// 第三方账号绑定
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}
// 校验用户名是否唯一
export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}
// 注册账号发送短信
export const userQQPatchCode = () => {
  return request('/login/code', 'get')
}