import { axios } from '@/utils/request'
import api from '@/api/index'

export function ProductSearch (parameter) {
  return axios({
    url: api.ProductSearch,
    method: 'get',
    params: parameter
  })
}

export function ProductCreate (parameter) {
  return axios({
    url: api.ProductCreate,
    method: 'post',
    data: parameter
  })
}

export function ProductUpdate (parameter) {
  return axios({
    url: api.ProductUpdate,
    method: 'post',
    data: parameter
  })
}

export function ProductDelete (parameter) {
  return axios({
    url: api.ProductDelete,
    method: 'post',
    data: parameter
  })
}
