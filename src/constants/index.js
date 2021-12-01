
export const API_ERROR_STATUS = 400
export const API_ERROR_STATUSES = [400, 500, 401, 403]
export const CREATE_SUCCESS_MSG = 'Tạo mới thành công'
export const UPDATE_SUCCESS_MSG = 'Cập Nhật Thành Công'

export const UPLOAD_FILE = {
  FILE_ACCEPT: '.png,.PNG,.jpeg,.JPEG,.jpg,.JPG,.pdf,.PDF,application/pdf',
  FILE_ACCEPT_PDF: '.pdf,.PDF,application/pdf',
  FILE_ACCEPT_DOC: '.doc,.DOC,.docx,.DOCX,.pdf,.PDF,application/pdf',
  FILE_ACCEPT_EXCEl: '.xls,.xlsx,.XLSX,.XLS,application/vnd.ms-excel',
  FILE_ACCEPT_TITLE: '.png,.jpeg,.jpg,.pdf,application/pdf'
}

export const DOWNLOADFILETEMPLRE = process.env.VUE_APP_API_SERVER_URL + 'file/downloadFileTemplate'
