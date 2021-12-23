import api from './index'
import { axios } from '@/utils/request'

// search đơn hàng
export function searchPreOrder (parameter) {
  return axios({
    url: api.preOrder.search,
    method: 'get',
    params: parameter
  })
}

// CHi tiết đơn hàng
export function getByIdPreOrder (parameter) {
  return axios({
    url: api.preOrder.getById,
    method: 'get',
    params: parameter
  })
}

// Import đơn hàng
export function importPreOrder (parameter) {
  return axios({
    url: api.preOrder.import,
    method: 'post',
    data: parameter
  })
}

// getList voucher
export function getListVoucher (parameter) {
  return axios({
    url: api.preOrder.listVoucher + '/' + parameter,
    method: 'get'
  })
}

// Chi tiết file
export function getDetailFile (parameter) {
  return axios({
    url: api.preOrder.getDetailFile,
    method: 'get',
    params: parameter
  })
}

// Import đơn hàng
export function importFileOrder (parameter) {
  return axios({
    url: api.preOrder.importOrder,
    method: 'post',
    data: parameter
  })
}
