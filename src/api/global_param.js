import { axios } from '@/utils/request'
import api from '@/api/index'

export function GlobalParamItems (parameter) {
  return axios({
    url: api.GlobalParamItems,
    method: 'get',
    params: parameter
  })
}

export function GlobalParamItemCreate (parameter) {
  return axios({
    url: api.GlobalParamItemCreate,
    method: 'post',
    data: parameter
  })
}

export function GlobalParamItemUpdate (parameter) {
  return axios({
    url: api.GlobalParamItemUpdate,
    method: 'post',
    data: parameter
  })
}
export function GlobalParamItemChangeStatus (parameter) {
  return axios({
    url: api.GlobalParamItemUpdate,
    method: 'post',
    data: parameter
  })
}

export function GlobalParamItemDelete (parameter) {
  return axios({
    url: api.GlobalParamItemDelete,
    method: 'post',
    data: parameter
  })
}
