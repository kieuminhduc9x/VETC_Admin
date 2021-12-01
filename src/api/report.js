import api from './index'
import { axios } from '@/utils/request'

export function exportReport (parameter) {
  return axios({
    url: api.exportReport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function previewReport (parameter) {
  return axios({
    url: api.previewReport,
    method: 'post',
    data: parameter,
    responseType: 'arraybuffer'

  })
}
