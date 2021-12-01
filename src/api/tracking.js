import { axiosTracking } from '@/utils/requestTracking'
import api from '@/api/index'

export function findByIdTracking (parameter) {
  return axiosTracking({
    url: api.findByIdTracking,
    method: 'get',
    params: parameter
  })
}
