import api from './index'
import { axios } from '@/utils/request'

export function searchSalesRevenue (parameter) {
  return axios({
    url: api.searchSalesRevenue,
    method: 'get',
    data: parameter
  })
}

export function searchSalesRevenueDetail (parameter) {
  return axios({
    url: api.searchSalesRevenueDetail,
    method: 'get',
    data: parameter
  })
}
