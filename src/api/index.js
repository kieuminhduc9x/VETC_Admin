const api = {
  Login: '/auth/userLogin',
  Logout: '/api/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  changePassword: '/auth/admin/changeUserPassword',

  GetStoreForUser: '/secUser/admin/getListWarehouse',

  // Global List
  GlobalListItems: '/globalList/searchGlobalList',
  GlobalListItemCreate: '/globalList/insertGlobalList',
  GlobalListItemUpdate: '/globalList/updateGlobalList',
  GlobalListItemDelete: '/globalList/removeGlobalList',
  // Global List Value
  GlobalListValueCreate: '/globalListValue/insertGlobalListValue',
  GlobalListValueUpdate: '/globalListValue/updateGlobalListValue',
  GlobalListValueDelete: '/globalListValue/removeGlobalListValue',
  GlobalListValueSearch: '/globalListValue/getGlobalListValue',
  SearchGlobalListValue: '/globalListValue/searchGlobalListValue',

  // global params
  GlobalParamItems: '/globalParam/searchGlobalParam',
  GlobalParamItemCreate: '/globalParam/insertGlobalParam',
  GlobalParamItemUpdate: '/globalParam/updateGlobalParam',
  GlobalParamItemDelete: '/globalParam/removeGlobalParam',

  // hub start
  UpdateWeight: '/order/updateWeight',
  GetOrderSendToFirstHub: '/order/getOrderSendToFirstHub',
  ConfirmReceiptOrderInFirstHub: '/order/confirmReceiptOrderInFirstHub',
  GetByIdForAdmin: '/order/getByIdForAdmin',
  SearchOrderToMerge: '/order/searchOrderToMerge',
  MergeOrder: '/order/mergeOrder',
  TransferToPlane: '/order/transferToPlane',
  GetOrderMergeNotYetTransferPlane: 'orderMerge/getOrderMergeNotYetTransferPlane',
  GetByOrderMerge: '/order/getByOrderMerge',
  AddToOrderMerge: '/order/addToOrderMerge',
  GetFlightToMerge: '/flight/getFlightToMerge',
  ReceiveAtFirstAirport: '/orderMerge/receiveAtFirstAirport',
  ReceiveAtLastAirport: '/orderMerge/receiveAtLastAirport',
  SearchOrderMergeToReceiveAtLastAirport: '/orderMerge/searchOrderMergeToReceiveAtLastAirport',
  RemoveOrder: '/orderMerge/removeOrder',
  OrderMergeUpdateFlight: '/orderMerge/updateFlight',

  // hub end
  GetListOrderMergeSendToLastHub: '/orderMerge/getListOrderMergeSendToLastHub',
  ConfirmReceiptOrderMergeInLastHub: '/orderMerge/confirmReceiptOrderMergeInLastHub',
  SearchOrderToBookingLastBike: '/order/searchOrderToBookingLastBike',
  SearchOrderDeliveryForLastBike: '/order/searchOrderDeliveryForLastBike',
  DeliveryOrderToLastBike: '/order/deliveryOrderToLastBike',

  // order
  OrderSearch: '/order/search',
  BookingLastBike: '/order/bookingLastBike',
  LastHubReceiveOrderBack: 'order/lastHubReceiveOrderBack',
  SearchOrderBackInLastHub: 'order/searchOrderBackInLastHub',
  orderDeliveryAgain: '/admin/order/rebookingShipping', // Đặt giao hàng lại

  // hub master
  SearchByHubName: '/hub/searchByHubName',
  DeleteHub: '/hub/deleteHub',
  InsertHub: '/hub/insertHub',
  GetHubs: '/hub/getHubs',
  UpdateHub: '/hub/updateHub',
  GetHubDetails: '/hub/getHubDetails',
  GetHubByProvince: '/hub/getHubByProvince',
  // product

  // area
  ListProvince: '/area/getProvinces',
  GetDistrictByProvince: '/area/getDistrictByProvince',
  GetPrecinctByDistrict: '/area/getPrecinctByDistrict',
  UpdateProvince: '/area/updateProvince',
  UpdateDistrict: '/area/updateDistrict',

  // user
  SearchSecUser: 'secUser/searchSecUser',
  InsertSecUser: 'secUser/insertSecUser',
  UpdateSecUser: 'secUser/updateSecUser',
  RemoveSecUser: 'secUser/removeSecUser',
  ResetPassword: 'secUser/resetPassword',
  GetUserWorkingInHub: 'secUser/getUserWorkingInHub',
  GetUserAddToHub: 'secUser/getUserAddToHub',
  AddUserToHub: 'userHub/addUserToHub',
  RemoveUserInHub: 'userHub/removeUserInHub',
  GetHubForUser: 'userHub/getHubForUser',
  GetHubToAddUser: 'hub/getHubToAddUser',

  // gia van don hang khon
  ProductOfferSearch: 'productOffer/search',
  ProductOfferCreate: 'productOffer/create',
  ProductOfferUpdate: 'productOffer/update',
  ProductOfferDelete: 'productOffer/delete',
  ProductOfferUpdateStatus: 'productOffer/updateStatus',

  // chuyen bay
  FlightSearch: 'flight/search',
  FlightCreate: 'flight/create',
  FlightUpdate: 'flight/update',
  FlightDelete: 'flight/delete',

  // hang hoa
  ProductSearch: 'product/search',
  ProductCreate: 'product/create',
  ProductUpdate: 'product/update',
  ProductDelete: 'product/delete',

  // lich trinh bay
  FlightScheduleSearch: 'flightSchedule/search',
  FlightScheduleDelete: 'flightSchedule/delete',
  FlightScheduleCreate: 'flightSchedule/create',
  FlightScheduleUpdate: 'flightSchedule/update',
  FlightScheduleUpdateStatus: 'flightSchedule/updateStatus',
  GetFlightScheduleMergeOrder: 'flightSchedule/getFlightScheduleMergeOrder?',
  GetFlightSchedule: 'flightSchedule/getByRoute',

  // don hoan
  ConfirmCustomerPickUpAtHub: 'order/confirmCustomerPickUpAtHub',
  ReDelivery: 'order/reDelivery',
  OrderDestroy: 'order/destroy',
  GetReDeliveryFee: 'order/getReDeliveryFee',
  GetTransferReturnFee: 'order/getTransferReturnFee',
  TransferToReceiverInLastHub: 'order/transferToReceiverInLastHub',
  TransferReturn: 'order/transferReturn',

  // Báo cáo
  exportReport: 'export-report-v2',
  previewReport: 'export-report-v2',
  searchSalesRevenue: '', // tìm kiếm doanh thu dự án
  searchSalesRevenueDetail: '', // tìm kiếm chi tiết doanh thu dự án

  // Tra cứu thông tin đơn hàng
  searchOrderInformation: '/admin/order/search',
  // getListSupplier: '/public/hrvSupplier/getAll', // Danh sách nhà cung cấp
  getListSupplier: '/admin/hrvSupplier/getAll', // Danh sách nhà cung cấp
  getListTransportCompany: '/public/transportCompany/getAll', // Danh sách đơn vị vận chuyển
  deliverySuccess: '/admin/order/confirmDelivered', // Giao hàng thành công
  cancelTransportCompanyOrder: '/admin/order/cancelTransportCompanyOrder', // Hủy vận đơn đối tác

  // Tracking đơn hàng
  findByIdTracking: '/public/order/getByVnaMallNumber',

  // quản lý nhà kho
  warehouseManagement: {
    search: '/warehouse/admin/search',
    create: '/warehouse/admin/create',
    update: '/warehouse/admin/update',
    detail: '/warehouse/admin/get-by-id',
    delete: '/warehouse/admin/delete'
  },

  // Quản lý danh sách máy đọc mã code
  barcodeReadersManagement: {
    search: '/scan-device/admin/search',
    create: '/scan-device/admin/create',
    update: '/scan-device/admin/update',
    detail: '',
    delete: '/scan-device/admin/delete'
  },

  // Quản lý xuất nhập
  importExportManagement: {
    search: '/voucher/admin/search'
  }

}
export default api
