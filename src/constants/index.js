
export const API_ERROR_STATUS = 400
export const API_ERROR_STATUSES = [400, 500, 401, 403]
export const CREATE_SUCCESS_MSG = 'Tạo mới thành công'
export const UPDATE_SUCCESS_MSG = 'Cập Nhật Thành Công'

export const PRODUCT_STATUS = {
  INACTIVE: '0',
  ACTIVE: '1'

}
export const UPLOAD_FILE = {
  FILE_ACCEPT: '.png,.PNG,.jpeg,.JPEG,.jpg,.JPG,.pdf,.PDF,application/pdf',
  FILE_ACCEPT_PDF: '.pdf,.PDF,application/pdf',
  FILE_ACCEPT_DOC: '.doc,.DOC,.docx,.DOCX,.pdf,.PDF,application/pdf',
  FILE_ACCEPT_EXCEl: '.xls,.xlsx,.XLSX,.XLS,application/vnd.ms-excel',
  FILE_ACCEPT_TITLE: '.png,.jpeg,.jpg,.pdf,application/pdf'
}

export const DOWNLOAD_DOCUMENT_URL = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFile'
export const DOWNLOADS_DOCUMENT_URL = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFile2'
export const DOWNLOAD_DOCUMENTDETAIL_URL = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFileByDocumentDetailTemp'
export const DOWNLOAD_DOCUMENTDETAIL_URL_REVENUE = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFileRevenue'
export const UPLOAD_DOCUMENT_URL = process.env.VUE_APP_API_SERVER_URL + 'file/uploadFile'
export const UPLOAD_DOCUMENT_URL_CONNECT = process.env.VUE_APP_API_SERVER_URL + 'file/uploadFileCustomer'
export const UPDATE = process.env.VUE_APP_API_SERVER_URL + '/file/updateFileProduct'
export const DOWNLOADFILETEMPLRE = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFileTemplate'
export const DOWNLOADFILETEMPLREREVENUE = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFileTemplateRevenue'
export const UPLOAD_PRODUCT_DOCUMENT_URL_CONNECT = process.env.VUE_APP_API_SERVER_URL + 'file/uploadFileProduct'
export const UPLOAD_UPDATE_FILE_PRODUCT = process.env.VUE_APP_API_SERVER_URL + 'file/updateFileProduct'
export const IMPORT_FILE = process.env.VUE_APP_API_SERVER_URL + 'revenuePlan/importRevenuePlan'
export const ORDER_ACTION_TYPE_OF_CONTRACT_IDS = ['10', '11']
export const ORDER_ACTION_TYPE_ID = ['25', '5']

export const PRODUCT_OFFER_TYPE_FIXED = '3'
export const PRODUCT_OFFER_TYPE_UNDEFINED = '2'
export const PRODUCT_OFFER_TYPE_PACKAGE = '1'
export const PRODUCT_GROUP_ID_MANAGER_SERVICE = '3'
export const ORDER_ACTION_TYPE_COMPLETED = '24'
export const LIST_SALE_CONFIG_STATUS = [
  {
    value: '0',
    label: 'Hết hiệu lực'
  },
  {
    value: '1',
    label: 'Hiệu lực'
  }
]
export const LIST_ALLOW_AFTER_AFTER_CONNECT = [
  '24', '23', '25', '2', '5', '14', '3'
]
export const LIST_ORDER_TYPE_AFTER_CONNECT = [
  '2', '3'
]
export const LIST_INFRASTRUCTURE_TYPE = [
  {
    value: 'ONNET',
    label: 'ONNET: 100% hạ tầng Viettel'
  },
  {
    value: 'OFFNET',
    label: 'OFFNET: Hạ tầng có một phần thuê lại của đối tác'
  }
]
export const LIST_SALE_LEVEL = [
  {
    value: '1',
    label: 'Mức 1: Tốc độ ≤ 622000 Kbps'
  },
  {
    value: '2',
    label: 'Mức 2: Tốc độ > 622000 Kbps'
  }
]
