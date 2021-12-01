import { axios } from '@/utils/request'
import api from '@/api/index'

export function ProductOfferSearch (parameter) {
  return axios({
    url: api.ProductOfferSearch,
    method: 'get',
    params: parameter
  })
}

export function ProductOfferCreate (parameter) {
  return axios({
    url: api.ProductOfferCreate,
    method: 'post',
    data: parameter
  })
}

export function ProductOfferUpdate (parameter) {
  return axios({
    url: api.ProductOfferUpdate,
    method: 'post',
    data: parameter
  })
}

export function ProductOfferDelete (parameter) {
  return axios({
    url: api.ProductOfferDelete,
    method: 'post',
    data: parameter
  })
}

export function ProductOfferUpdateStatus (parameter) {
  return axios({
    url: api.ProductOfferUpdateStatus,
    method: 'post',
    data: parameter
  })
}
