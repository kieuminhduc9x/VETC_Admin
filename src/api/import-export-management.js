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
