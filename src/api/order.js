import { axios } from '@/utils/request'
import api from '@/api/index'

export function GetOrderSendToFirstHub (parameter) {
  return axios({
    url: api.GetOrderSendToFirstHub,
    method: 'get',
    params: parameter
  })
}

export function GetByIdForAdmin (parameter) {
  return axios({
    url: api.GetByIdForAdmin,
    method: 'get',
    params: parameter
  })
}

export function SearchOrderToMerge (parameter) {
  return axios({
    url: api.SearchOrderToMerge,
    method: 'get',
    params: parameter
  })
}

export function ConfirmReceiptOrderInFirstHub (parameter) {
  return axios({
    url: api.ConfirmReceiptOrderInFirstHub,
    method: 'post',
    data: parameter
  })
}

export function GetListOrderMergeSendToLastHub (parameter) {
  return axios({
    url: api.GetListOrderMergeSendToLastHub,
    method: 'get',
    params: parameter
  })
}

export function GetFlightToMerge (parameter) {
  return axios({
    url: api.GetFlightToMerge,
    method: 'get',
    params: parameter
  })
}

export function ConfirmReceiptOrderMergeInLastHub (parameter) {
  return axios({
    url: api.ConfirmReceiptOrderMergeInLastHub,
    method: 'post',
    data: parameter
  })
}

export function MergeOrder (parameter) {
  return axios({
    url: api.MergeOrder,
    method: 'post',
    data: parameter
  })
}

export function TransferToPlane (parameter) {
  return axios({
    url: api.TransferToPlane,
    method: 'post',
    data: parameter
  })
}

export function AddToOrderMerge (parameter) {
  return axios({
    url: api.AddToOrderMerge,
    method: 'post',
    data: parameter
  })
}

export function BookingLastBike (parameter) {
  return axios({
    url: api.BookingLastBike,
    method: 'post',
    data: parameter
  })
}

export function GetByOrderMerge (parameter) {
  return axios({
    url: api.GetByOrderMerge,
    method: 'get',
    params: parameter
  })
}

export function GetOrderMergeNotYetTransferPlane (parameter) {
  return axios({
    url: api.GetOrderMergeNotYetTransferPlane,
    method: 'get',
    params: parameter
  })
}

export function SearchOrderToBookingLastBike (parameter) {
  return axios({
    url: api.SearchOrderToBookingLastBike,
    method: 'get',
    params: parameter
  })
}

export function ProductSearch (parameter) {
  return axios({
    url: api.ProductSearch,
    method: 'get',
    params: parameter
  })
}

export function SearchOrderDeliveryForLastBike (parameter) {
  return axios({
    url: api.SearchOrderDeliveryForLastBike,
    method: 'get',
    params: parameter
  })
}

export function OrderSearch (parameter) {
  return axios({
    url: api.OrderSearch,
    method: 'get',
    params: parameter
  })
}

export function DeliveryOrderToLastBike (parameter) {
  return axios({
    url: api.DeliveryOrderToLastBike,
    method: 'post',
    data: parameter
  })
}

export function UpdateWeight (parameter) {
  return axios({
    url: api.UpdateWeight,
    method: 'post',
    data: parameter
  })
}

export function ReceiveAtFirstAirport (parameter) {
  return axios({
    url: api.ReceiveAtFirstAirport,
    method: 'post',
    data: parameter
  })
}

export function ReceiveAtLastAirport (parameter) {
  return axios({
    url: api.ReceiveAtLastAirport,
    method: 'post',
    data: parameter
  })
}

export function SearchOrderMergeToReceiveAtLastAirport (parameter) {
  return axios({
    url: api.SearchOrderMergeToReceiveAtLastAirport,
    method: 'get',
    params: parameter
  })
}

export function RemoveOrder (parameter) {
  return axios({
    url: api.RemoveOrder,
    method: 'post',
    data: parameter
  })
}

export function OrderMergeUpdateFlight (parameter) {
  return axios({
    url: api.OrderMergeUpdateFlight,
    method: 'post',
    data: parameter
  })
}

export function LastHubReceiveOrderBack (parameter) {
  return axios({
    url: api.LastHubReceiveOrderBack,
    method: 'post',
    data: parameter
  })
}

export function SearchOrderBackInLastHub (parameter) {
  return axios({
    url: api.SearchOrderBackInLastHub,
    method: 'get',
    params: parameter
  })
}

export function ConfirmCustomerPickUpAtHub (parameter) {
  return axios({
    url: api.ConfirmCustomerPickUpAtHub,
    method: 'post',
    data: parameter
  })
}

export function OrderDestroy (parameter) {
  return axios({
    url: api.OrderDestroy,
    method: 'post',
    data: parameter
  })
}

export function ReDelivery (parameter) {
  return axios({
    url: api.ReDelivery,
    method: 'post',
    data: parameter
  })
}

export function TransferReturn (parameter) {
  return axios({
    url: api.TransferReturn,
    method: 'post',
    data: parameter
  })
}
export function TransferToReceiverInLastHub (parameter) {
  return axios({
    url: api.TransferToReceiverInLastHub,
    method: 'post',
    data: parameter
  })
}

export function GetReDeliveryFee (parameter) {
  return axios({
    url: api.GetReDeliveryFee,
    method: 'get',
    params: parameter
  })
}

export function GetTransferReturnFee (parameter) {
  return axios({
    url: api.GetTransferReturnFee,
    method: 'get',
    params: parameter
  })
}

// Tra cứu thông tin đơn hàng
export function searchOrderInformation (parameter) {
  let page = 0
  let size = 25
  if (parameter.page) page = parameter.page
  if (parameter.size) size = parameter.size
  return axios({
    url: api.searchOrderInformation + '?page=' + page + '&size=' + size,
    method: 'post',
    data: parameter
  })
}

// Danh sách nhà cung cấp
export function getListSupplier (parameter) {
  return axios({
    url: api.getListSupplier,
    method: 'get',
    params: parameter
  })
}
// Danh sách đơn vị vận chuyển
export function getListTransportCompany (parameter) {
  return axios({
    url: api.getListTransportCompany,
    method: 'get',
    params: parameter
  })
}

// Đặt giao hàng lại
export function orderDeliveryAgain (parameter) {
  return axios({
    url: api.orderDeliveryAgain,
    method: 'post',
    data: parameter
  })
}

// Giao hàng thành công
export function deliverySuccess (parameter) {
  return axios({
    url: api.deliverySuccess,
    method: 'post',
    data: parameter
  })
}

// Hủy vận đơn đối tác
export function cancelTransportCompanyOrder (parameter) {
  return axios({
    url: api.cancelTransportCompanyOrder,
    method: 'post',
    data: parameter
  })
}
