import { axios } from '@/utils/request'
import api from '@/api/index'

export function searchBarcodeReadersManagement (parameter) {
  return axios({
    url: api.barcodeReadersManagement.search,
    method: 'get',
    params: parameter
  })
}

// thêm mới
export function createBarcodeReadersManagement (parameter) {
  return axios({
    url: api.barcodeReadersManagement.create,
    method: 'post',
    data: parameter
  })
}

// Cập nhật
export function updateBarcodeReadersManagement (parameter) {
  return axios({
    url: api.barcodeReadersManagement.update,
    method: 'post',
    data: parameter
  })
}

// Xóa
export function deleteBarcodeReadersManagement (parameter) {
  return axios({
    url: api.barcodeReadersManagement.delete,
    method: 'post',
    data: parameter
  })
}

// chi tiết
export function findByIdBarcodeReadersManagement (parameter) {
  return axios({
    url: api.barcodeReadersManagement.detail,
    method: 'get',
    params: parameter
  })
}
