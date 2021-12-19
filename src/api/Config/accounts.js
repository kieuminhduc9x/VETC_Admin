import { axios } from '@/utils/request'
import api from '@/api'

export function searchAccount (parameter) {
  return axios({
    url: api.account.search,
    method: 'get',
    params: parameter
  })
}
export function createAccount (parameter) {
  return axios({
    url: api.account.create,
    method: 'post',
    data: parameter
  })
}
export function updateAccoount (parameter) {
  return axios({
    url: api.account.update,
    method: 'post',
    data: parameter
  })
}
export function deleteAccount (parameter) {
  return axios({
    url: api.account.delete,
    method: 'post',
    data: parameter
  })
}
