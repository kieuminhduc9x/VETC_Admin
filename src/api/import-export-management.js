import { axios } from '@/utils/request'
import api from '@/api/index'

export function searchImportExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.search,
    method: 'get',
    params: parameter
  })
}

export function getByIdImportExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.getById,
    method: 'get',
    params: parameter
  })
}

// Kiểm tra phiếu yêu cầu
export function checkPrintVoucherImportExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.checkPrintVoucher,
    method: 'get',
    params: parameter
  })
}

// Xác nhận xuất kho
export function acceptExportImportExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.acceptExport,
    method: 'post',
    data: parameter
  })
}

// Xác nhận giao hàng thành công
export function acceptSuccessfulDeliveryImportExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.acceptSuccessfulDelivery,
    method: 'post',
    data: parameter
  })
}
