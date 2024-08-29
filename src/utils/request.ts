import axios from 'axios'

import { getItem, removeItem } from '@/utils/localStorage'
import router from '@/router'
import { State } from '@/states'
const instance = axios.create({
  baseURL: '/v3pz',
  timeout: 10000,
  headers: {
    terminal: State.TERMINAL
  }
})
const whitelist = ['/login']
instance.interceptors.request.use(
  (config) => {
    const token = getItem(State.H5_TOKEN)
    //whitelist
    if (token && !whitelist.includes(config.url!)) {
      config.headers['h-token'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === -1) {
      if (typeof response.data.message === 'object') {
        // ElMessage.warning(response.data.message.msg)
      } else {
        // ElMessage.warning(response.data.message)
      }
    }
    if (response.data.code === -2) {
      removeItem(State.H5_TOKEN)
      removeItem(State.H5_USER_INFO)
      router.replace('/login')
    }
    return response.data
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //token过期
          break
        case 403:
          //没有权限
          break
        case 404:
          //接口不存在
          break
        case 500:
          //服务器错误
          break
        default:
          break
      }
      return Promise.reject(error)
    }
  }
)

export default instance
