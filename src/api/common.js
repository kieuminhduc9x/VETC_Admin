import api from './index'
import { axios } from '@/utils/request'

export async function listProvince (parameter) {
  return axios({
    url: api.ListProvince,
    method: 'get',
    params: parameter
  })
}
export async function GetDistrictByProvince (parameter) {
  return axios({
    url: api.GetDistrictByProvince,
    method: 'get',
    params: parameter
  })
}
export async function GetPrecinctByDistrict (parameter) {
  return axios({
    url: api.GetPrecinctByDistrict,
    method: 'get',
    params: parameter
  })
}
export function UpdateProvince (parameter) {
  return axios({
    url: api.UpdateProvince,
    method: 'post',
    data: parameter
  })
}
export function UpdateDistrict (parameter) {
  return axios({
    url: api.UpdateDistrict,
    method: 'post',
    data: parameter
  })
}
