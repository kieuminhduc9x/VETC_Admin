import api from './index'
import { axios } from '@/utils/request'

// export function findByCode (parameter) {
//   return axios({
//     url: api.GlobalList,
//     method: 'get',
//     params: parameter
//   })
// }

export function GlobalListItems (parameter) {
  return axios({
    url: api.GlobalListItems,
    method: 'get',
    params: parameter
  })
}

export function GlobalListItemCreate (parameter) {
  return axios({
    url: api.GlobalListItemCreate,
    method: 'post',
    data: parameter
  })
}

export function GlobalListItemUpdate (parameter) {
  return axios({
    url: api.GlobalListItemUpdate,
    method: 'post',
    data: parameter
  })
}

export function GlobalListItemDelete (parameter) {
  return axios({
    url: api.GlobalListItemDelete,
    method: 'post',
    data: parameter
  })
}

export function GlobalListValueCreate (parameter) {
  return axios({
    url: api.GlobalListValueCreate,
    method: 'post',
    data: parameter
  })
}

export function GlobalListValueUpdate (parameter) {
  return axios({
    url: api.GlobalListValueUpdate,
    method: 'post',
    data: parameter
  })
}
export function GlobalListValueDelete (parameter) {
  return axios({
    url: api.GlobalListValueDelete,
    method: 'post',
    data: parameter
  })
}

export function GlobalListValueSearch (parameter) {
  return axios({
    url: api.GlobalListValueSearch,
    method: 'get',
    params: parameter
  })
}

export function SearchGlobalListValue (parameter) {
  return axios({
    url: api.SearchGlobalListValue,
    method: 'get',
    params: parameter
  })
}
