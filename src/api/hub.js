import { axios } from '@/utils/request'
import api from '@/api/index'

export function SearchByHubName (parameter) {
  return axios({
    url: api.SearchByHubName,
    method: 'get',
    params: parameter
  })
}

export function GetHubDetails (parameter) {
  return axios({
    url: api.GetHubDetails,
    method: 'get',
    params: parameter
  })
}

export function DeleteHub (parameter) {
  return axios({
    url: api.DeleteHub,
    method: 'post',
    data: parameter
  })
}

export function GetHubs (parameter) {
  return axios({
    url: api.GetHubs,
    method: 'get',
    params: parameter
  })
}
export function GetHubByProvince (parameter) {
  return axios({
    url: api.GetHubByProvince,
    method: 'get',
    params: parameter
  })
}

export function InsertHub (parameter) {
  return axios({
    url: api.InsertHub,
    method: 'post',
    data: parameter
  })
}

export function UpdateHub (parameter) {
  return axios({
    url: api.UpdateHub,
    method: 'post',
    data: parameter
  })
}
