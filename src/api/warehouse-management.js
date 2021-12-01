import { axiosWarehouse } from '@/utils/requestWarehouse'
import api from '@/api/index'

// tìm kiếm
export function searchWarehouseManagement (parameter) {
  return axiosWarehouse({
    url: api.warehouseManagement.search,
    method: 'get',
    params: parameter
  })
}

// thêm mới
export function createWarehouseManagement (parameter) {
  return axiosWarehouse({
    url: api.warehouseManagement.create,
    method: 'post',
    data: parameter
  })
}

// Cập nhật
export function updateWarehouseManagement (parameter) {
  return axiosWarehouse({
    url: api.warehouseManagement.update,
    method: 'post',
    data: parameter
  })
}

// Xóa
export function deleteWarehouseManagement (parameter) {
  return axiosWarehouse({
    url: api.warehouseManagement.delete,
    method: 'post',
    data: parameter
  })
}

// chi tiết
export function findByIdWarehouseManagement (parameter) {
  return axiosWarehouse({
    url: api.warehouseManagement.detail,
    method: 'get',
    params: parameter
  })
}
