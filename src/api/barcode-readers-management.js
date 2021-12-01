import { axiosWarehouse } from '@/utils/requestWarehouse'
import api from '@/api/index'

export function searchBarcodeReadersManagement (parameter) {
  return axiosWarehouse({
    url: api.barcodeReadersManagement.search,
    method: 'get',
    params: parameter
  })
}

// thêm mới
export function createBarcodeReadersManagement (parameter) {
  return axiosWarehouse({
    url: api.barcodeReadersManagement.create,
    method: 'post',
    data: parameter
  })
}

// Cập nhật
export function updateBarcodeReadersManagement (parameter) {
  return axiosWarehouse({
    url: api.barcodeReadersManagement.update,
    method: 'post',
    data: parameter
  })
}

// Xóa
export function deleteBarcodeReadersManagement (parameter) {
  return axiosWarehouse({
    url: api.barcodeReadersManagement.delete,
    method: 'post',
    data: parameter
  })
}

// chi tiết
export function findByIdBarcodeReadersManagement (parameter) {
  return axiosWarehouse({
    url: api.barcodeReadersManagement.detail,
    method: 'get',
    params: parameter
  })
}
