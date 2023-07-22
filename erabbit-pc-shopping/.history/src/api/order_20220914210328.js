import request from '@/utils/request'

// 获取结算信息
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}
// 添加收获地址信息 address
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}
