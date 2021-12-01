import axios from 'axios'
import store from './../store/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { deepTrim } from '@/utils/common'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_STORE,
  timeout: 160000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      /*
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      */
      store.dispatch('auth/logOut').then(() => {
        window.location.href = process.env.VUE_APP_PASSPORT_URL + '?appCode=' + process.env.VUE_APP_DOMAIN_CODE + '&service=' + process.env.VUE_APP_LOGIN_URL
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const currentUser = store.getters['auth/currentUser']
  if (config.params === undefined) {
    config['params'] = {}
  }
  if (currentUser) {
    if (currentUser.token) {
      config.headers['Authorization'] = currentUser.token
    } else if (currentUser.tokenAuth) {
      config.headers['Authorization'] = currentUser.tokenAuth
    }
    /*
    config.params['accessToken'] = currentUser.accessToken
    if (config.data) {
      config.data['accessToken'] = currentUser.accessToken
    }
    */
  }
  if (config.params) {
    deepTrim(config['params'])
  }
  if (config.data) {
    deepTrim(config['data'])
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axiosStore
}
