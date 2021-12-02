import api from './index'
import { axios } from '@/utils/request'

export function SearchUser (parameter) {
  return axios({
    url: api.SearchUser,
    method: 'get',
    params: parameter
  })
}
export function InsertUser (parameter) {
  return axios({
    url: api.InsertUser,
    method: 'post',
    data: parameter
  })
}
export function UpdateUser (parameter) {
  return axios({
    url: api.UpdateUser,
    method: 'post',
    data: parameter
  })
}
export function RemoveUser (parameter) {
  return axios({
    url: api.RemoveUser,
    method: 'post',
    data: parameter
  })
}
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
