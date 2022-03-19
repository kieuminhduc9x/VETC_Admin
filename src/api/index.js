const api = {
  Login: '/auth/login',
  Logout: '/api/logout',
  // ForgePassword: '/auth/forge-password',
  // Register: '/auth/register',
  // twoStepCode: '/auth/2step-code',
  // SendSms: '/account/sms',
  // SendSmsErr: '/account/sms_err',
  changePassword: '/auth/admin/changePassword',
  GetStoreForUser: '/user/admin/getListWarehouse',

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
  GlobalParamItemDelete: '/globalParam/removeGlobalParam'

}
export default api
