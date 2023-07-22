import request from '@/utils/request'

// 账号登录
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
// 短信登录
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}