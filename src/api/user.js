import api from './index'
import { axios } from '@/utils/request'
// import { axiosStore } from '@/utils/requestStore'

export function GetUserAddToHub (parameter) {
  return axios({
    url: api.GetUserAddToHub,
    method: 'get',
    params: parameter
  })
}
export function GetUserWorkingInHub (parameter) {
  return axios({
    url: api.GetUserWorkingInHub,
    method: 'get',
    params: parameter
  })
}
export function SearchSecUser (parameter) {
  return axios({
    url: api.SearchSecUser,
    method: 'get',
    params: parameter
  })
}
export function InsertSecUser (parameter) {
  return axios({
    url: api.InsertSecUser,
    method: 'post',
    data: parameter
  })
}
export function UpdateSecUser (parameter) {
  return axios({
    url: api.UpdateSecUser,
    method: 'post',
    data: parameter
  })
}
export function RemoveSecUser (parameter) {
  return axios({
    url: api.RemoveSecUser,
    method: 'post',
    data: parameter
  })
}
export function ResetPassword (parameter) {
  return axios({
    url: api.ResetPassword,
    method: 'post',
    data: parameter
  })
}
export function AddUserToHub (parameter) {
  return axios({
    url: api.AddUserToHub,
    method: 'post',
    data: parameter
  })
}
export function RemoveUserInHub (parameter) {
  return axios({
    url: api.RemoveUserInHub,
    method: 'post',
    data: parameter
  })
}
export function GetHubForUser (parameter) {
  return axios({
    url: api.GetHubForUser,
    method: 'get',
    params: parameter
  })
}
export function GetHubToAddUser (parameter) {
  return axios({
    url: api.GetHubToAddUser,
    method: 'get',
    params: parameter
  })
}

export function changePassword (parameter) {
  return axios({
    url: api.changePassword,
    method: 'post',
    data: parameter
  })
}
export function GetStoreForUser (parameter) {
  return axios({
    url: api.GetStoreForUser,
    method: 'get',
    params: parameter
  })
}
