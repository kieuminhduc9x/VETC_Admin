import { axios } from '@/utils/request'
import api from '@/api'

export function searchAccount (parameter) {
  return axios({
    url: api.user.search,
    method: 'get',
    params: parameter
  })
}
export function createAccount (parameter) {
  return axios({
    url: api.user.create,
    method: 'post',
    data: parameter
  })
}
export function updateAccount (parameter) {
  return axios({
    url: api.user.update,
    method: 'post',
    data: parameter
  })
}
export function deleteAccount (parameter) {
  return axios({
    url: api.user.delete,
    method: 'post',
    data: parameter
  })
}
export function findByIdAccount (parameter) {
  return axios({
    url: api.user.findById,
    method: 'get',
    params: parameter
  })
}

export function resetPasswordAccount (parameter) {
  return axios({
    url: api.user.resetPassword,
    method: 'post',
    data: parameter
  })
}
