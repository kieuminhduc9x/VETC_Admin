import api from './index'
import { axios } from '@/utils/request'

export function searchRole (parameter) {
  return axios({
    url: api.searchRole,
    method: 'get',
    params: parameter
  })
}
export function getByIdRole (parameter) {
  return axios({
    url: api.getByIdRole,
    method: 'get',
    params: parameter
  })
}
export function createRole (parameter) {
  return axios({
    url: api.createRole,
    method: 'post',
    data: parameter
  })
}
export function updateRole (parameter) {
  return axios({
    url: api.updateRole,
    method: 'post',
    data: parameter
  })
}
export function deleteRole (parameter) {
  return axios({
    url: api.deleteRole,
    method: 'post',
    data: parameter
  })
}
export function createStaffByRole (parameter) {
  return axios({
    url: api.createStaffByRole,
    method: 'post',
    data: parameter
  })
}
