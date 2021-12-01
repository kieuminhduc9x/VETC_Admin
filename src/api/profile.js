import { axios } from '@/utils/request'
import api from '@/api/index'

export function ProfileItems (parameter) {
  return axios({
    url: api.ProfileItems,
    method: 'get',
    params: parameter
  })
}

export function ProfileItemCreate (parameter) {
  return axios({
    url: api.ProfileItemCreate,
    method: 'post',
    data: parameter
  })
}

export function ProfileItemUpdate (parameter) {
  return axios({
    url: api.ProfileItemUpdate,
    method: 'post',
    data: parameter
  })
}
export function ProfileItemChangeStatus (parameter) {
  return axios({
    url: api.ProfileItemChangeStatus,
    method: 'post',
    data: parameter
  })
}
export function findByContentProfile (parameter) {
  return axios({
    url: api.findByContentProfile,
    method: 'get',
    params: parameter
  })
}
