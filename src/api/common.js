import api from './index'
import { axios } from '@/utils/request'
import { axiosReport } from '@/utils/requestReport'

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
export async function getApParamByType (parameter) {
  return axiosReport({
    url: api.getApParamByType,
    method: 'get',
    params: parameter
  })
}
export function listDistrict (parameter) {
  return axios({
    url: api.ListDistrict,
    method: 'get',
    params: parameter
  })
}

export function listPhoenix (parameter) {
  return axios({
    url: api.ListPhoenix,
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
