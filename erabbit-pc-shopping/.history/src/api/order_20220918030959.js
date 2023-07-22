import request from '@/utils/request'

// 获取结算信息
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}
// 添加收货地址信息 address地址信息
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}
// 修改收货地址
export const editAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form)
}
// 删除收货地址
export const deleteAddress = (form) => {
  return request(`/member/address/${form.id}`, 'delete', form)
}
// 提交订单
export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}
// 获取订单详情
export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}
// 获取收藏商品
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}
// 添加收藏商品
export const addCollect = ({ collectType = 1, collectObjectIds }) => {
  return request('/member/collect', 'post', { collectType, collectObjectIds })
}
// 获取足迹
export const findbrowseHistory = ({ page = 1, pageSize = 10 }) => {
  return request('/member/browseHistory', 'get', { page, pageSize })
}
// 获取订单列表 orderState：订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
export const findOrderList = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}
// 取消订单
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}
// 删除订单
export const deleteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}
// 确认收货
export const receiptOrder = (id) => {
  return request('/member/order/:id/receipt', 'put', { id })
}
// 查看物流
export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
// 获取订单详情
export const findOrderDetail = (id) => {
  return request(`/member/order/${id}`, 'get')
}
