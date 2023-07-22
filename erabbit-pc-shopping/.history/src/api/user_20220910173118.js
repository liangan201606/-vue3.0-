import request from '@/utils/request'

// 账号登录
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}