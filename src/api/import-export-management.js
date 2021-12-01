import { axios } from '@/utils/request'
import api from '@/api/index'

export function searchImporteExportManagement (parameter) {
  return axios({
    url: api.importExportManagement.search,
    method: 'get',
    params: parameter
  })
}
