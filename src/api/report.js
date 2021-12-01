import api from './index'
import { axiosReport } from '@/utils/requestReport'

export function exportReport (parameter) {
  return axiosReport({
    url: api.exportReport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function previewReport (parameter) {
  return axiosReport({
    url: api.previewReport,
    method: 'post',
    data: parameter,
    responseType: 'arraybuffer'

  })
}
