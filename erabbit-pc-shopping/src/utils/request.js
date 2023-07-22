// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios 的一些配置，baseURL  timeout
  baseURL,
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地又token就在头部携带
    // 1.获取用户信息对象
    const { profile } = store.state.user
    console.log(profile.token)
    // 2.判断是否有token
    if (profile.token) {
      // 3.设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
// res => res.data剥离无效数据 取出data数据直接拿到后台数据
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // 401状态码 进入该函数
    if (err.response && err.response === 401) {
      // 1.清空无效用户信息
      // 2. 跳转到登录页
      // 3. 跳转需要传参（当前路由地址）给登录页码(重定向)
      store.commit('user/setUser', {})
      // 当前路由地址获取
      // 在组件中：$route.path === /user   $route.fullPath === /user?a=10
      // js模块中：router.currentRoute === $route 当前路由信息对象 是ref包装的响应式数据
      // 不能有特殊字符
      // encodeURIComponent 转换uri编码，防止解析地址出问题
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具函数
export default (url, method, submitDate) => {
  // 负责发起请求 请求地址 请求方式 提交数据
  return instance({
    url,
    method,
    // 1.如果是get请求 需要使用params来传递submitDate ?a=10&c=10
    // 2.如果是post请求 需要使用data来传递submitDate 请求体传参
    // []动态插入 设置一个动态的key 写js表达式 js表达式的执行结果当做KEY
    // method参数可能是get,Get,GET  转换成小写get再来判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitDate
  })
}
