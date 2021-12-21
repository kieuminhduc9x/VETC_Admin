import { axios } from '@/utils/request'
import api from '@/api'

export function searchRoles (parameter) {
  return axios({
    url: api.roles.search,
    method: 'get',
    params: parameter
  })
}
export function createRoles (parameter) {
  return axios({
    url: api.roles.create,
    method: 'post',
    data: parameter
  })
}
export function updateRoles (parameter) {
  return axios({
    url: api.roles.update,
    method: 'post',
    data: parameter
  })
}
export function deleteRoles (parameter) {
  return axios({
    url: api.roles.delete,
    method: 'post',
    data: parameter
  })
}
export function findByIdRoles (parameter) {
  return axios({
    url: api.roles.findById,
    method: 'get',
    params: parameter
  })
}

// Thêm user vào vai trò
export function addUser (parameter) {
  return axios({
    url: api.roles.addUser,
    method: 'post',
    data: parameter
  })
}

// Xóa user khỏi vai trò
export function removeUser (parameter) {
  return axios({
    url: api.roles.removeUser,
    method: 'post',
    data: parameter
  })
}
