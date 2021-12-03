const api = {
  Login: '/auth/login',
  Logout: '/api/logout',
  // ForgePassword: '/auth/forge-password',
  // Register: '/auth/register',
  // twoStepCode: '/auth/2step-code',
  // SendSms: '/account/sms',
  // SendSmsErr: '/account/sms_err',
  changePassword: '/auth/admin/changePassword',

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

  // area
  ListProvince: '/area/get-province',
  GetDistrictByProvince: '/area/getDistrictByProvince',
  GetPrecinctByDistrict: '/area/getPrecinctByDistrict',
  UpdateProvince: '/area/updateProvince',
  UpdateDistrict: '/area/updateDistrict',

  // user
  SearchUser: '/user/admin/search',
  findByIdUser: '/user/admin/get-by-id',
  InsertUser: '/user/admin/insert',
  UpdateUser: '/user/admin/update',
  RemoveUser: '/user/admin/remove',
  ResetPassword: '/user/admin/reset-password',

  // Báo cáo
  exportReport: 'export-report-v2',
  previewReport: 'export-report-v2',

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
    delete: '/scan-device/admin/delete'
  },

  // Quản lý xuất nhập
  importExportManagement: {
    search: '/voucher/admin/search',
    getById: '/voucher/admin/get-by-id',
    checkPrintVoucher: '/voucher/admin/printed-output-voucher', // Kiểm tra trước khi in phiếu
    acceptExport: '/voucher/admin/accept-export', // Xác nhận xuất kho
    acceptSuccessfulDelivery: '/voucher/admin/accept-successful-delivery' // Xác nhận giao hàng thành công
  },
  // Quản lý đơn đặt hàng
  preOrder: {
    search: '/pre-order/admin/search',
    getById: '/pre-order/admin/get-by-id',
    import: '/pre-order/admin/import'
  }

}
export default api
