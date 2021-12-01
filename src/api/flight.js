import { axios } from '@/utils/request'
import api from '@/api/index'

export function FlightSearch (parameter) {
  return axios({
    url: api.FlightSearch,
    method: 'get',
    params: parameter
  })
}

export function FlightCreate (parameter) {
  return axios({
    url: api.FlightCreate,
    method: 'post',
    data: parameter
  })
}

export function FlightUpdate (parameter) {
  return axios({
    url: api.FlightUpdate,
    method: 'post',
    data: parameter
  })
}

export function FlightDelete (parameter) {
  return axios({
    url: api.FlightDelete,
    method: 'post',
    data: parameter
  })
}

export function FlightScheduleSearch (parameter) {
  return axios({
    url: api.FlightScheduleSearch,
    method: 'get',
    params: parameter
  })
}
export function GetFlightScheduleMergeOrder (parameter) {
  return axios({
    url: api.GetFlightScheduleMergeOrder,
    method: 'get',
    params: parameter
  })
}

export function FlightScheduleDelete (parameter) {
  return axios({
    url: api.FlightScheduleDelete,
    method: 'post',
    data: parameter
  })
}

export function FlightScheduleUpdateStatus (parameter) {
  return axios({
    url: api.FlightScheduleUpdateStatus,
    method: 'post',
    data: parameter
  })
}

export function FlightScheduleCreate (parameter) {
  return axios({
    url: api.FlightScheduleCreate,
    method: 'post',
    data: parameter
  })
}

export function FlightScheduleUpdate (parameter) {
  return axios({
    url: api.FlightScheduleUpdate,
    method: 'post',
    data: parameter
  })
}

export function GetFlightSchedule (parameter) {
  return axios({
    url: api.GetFlightSchedule,
    method: 'get',
    params: parameter
  })
}
