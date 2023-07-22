// 获取商品信息
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
