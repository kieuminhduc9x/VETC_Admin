import api from './index'
import { axios } from '@/utils/request'

export function ResetPassword (parameter) {
  return axios({
    url: api.ResetPassword,
    method: 'post',
    data: parameter
  })
}

export function changePassword (parameter) {
  return axios({
    url: api.changePassword,
    method: 'post',
    data: parameter
  })
}
