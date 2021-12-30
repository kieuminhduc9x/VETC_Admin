<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/import-export-management">Nhập xuất hàng</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Chi tiết</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-form-model
      ref="ruleForm"
      :model="form"
      layout="vertical">
      <a-collapse v-model="activeKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Thông tin chi tiết" key="1">
          <a-spin :spinning="loading">
            <a-card style="width: 100%;border: none" class="search-container">
              <a-row :gutter="16">
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Tên kho"
                    prop="warehouseName"
                    :rules="[]">
                    <a-input
                      :disabled="true"
                      v-model="form.warehouseName">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Mã Phiếu"
                    prop="voucherCode"
                    :rules="[]">
                    <a-input
                      :disabled="true"
                      v-model="form.voucherCode">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Mã đơn hàng"
                    prop="preOrderNo"
                    :rules="[]">
                    <a-input
                      :disabled="true"
                      v-model="form.preOrderNo">
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Trạng thái"
                    prop="statusName"
                    :rules="[]">
                    <a-input
                      :disabled="true"
                      v-model="form.statusName">
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex" justify="center">
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Ngày nhập"
                    prop="importAt"
                    :rules="[]">
                    <a-date-picker
                      :disabled="true"
                      placeholder="DD/MM/YYYY"
                      :format="'DD/MM/YYYY'"
                      v-model="form.importAt">
                    </a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Ngày xuất"
                    prop="exportAt"
                    :rules="[]">
                    <a-date-picker
                      :disabled="true"
                      placeholder="DD/MM/YYYY"
                      :format="'DD/MM/YYYY'"
                      v-model="form.exportAt">
                    </a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                  <a-form-model-item
                    label="Ngày xác nhận giao hàng"
                    prop="deliveredAt"
                    :rules="[]">
                    <a-date-picker
                      :disabled="true"
                      placeholder="DD/MM/YYYY"
                      :format="'DD/MM/YYYY'"
                      v-model="form.deliveredAt">
                    </a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" :lg="6" class="filter-item-container"></a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :xs="24" :md="24" :lg="24">
                  <div style="display: flex; justify-content: center">
                    <a-button style="margin-right: 1rem" @click="goToBack">Quay lại</a-button>
                    <a-button v-if="String(form.status) !== '3' && $auth.hasPrivilege('VOUCHER_MANAGEMENT_PRINT_OUTPUT_VOUCHER')" style="margin-right: 1rem" @click="checkPrintVoucher">In phiếu xuất</a-button>
                    <a-button v-if="String(form.status) === '1' && $auth.hasPrivilege('VOUCHER_MANAGEMENT_ACCEPT_EXPORT')" type="primary" style="margin-right: 1rem" @click="showAcceptExport">Xác nhận xuất hàng</a-button>
                    <a-button v-if="String(form.status) === '2' && $auth.hasPrivilege('VOUCHER_MANAGEMENT_ACCEPT_SUCCESSFUL_DELIVERY') " type="primary" style="margin-right: 1rem" @click="showAcceptDelivery">Xác nhận giao hàng thành công</a-button>
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-spin>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>

    <a-collapse v-model="activeKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách kiện hàng và tài liệu đính kèm" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row :gutter="16" type="flex">
            <a-col :span="12">
              <a-table
                ref="tb1"
                :columns="columns"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
              </a-table>
            </a-col>
            <a-col :span="12">
              <a-table
                ref="tb1"
                :columns="columnsDocument"
                :data-source="dataDocument"
                :rowKey=" (rowKey, index ) => index"
                :pagination="paginationDocument"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChangeDocument"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="fileName" slot-scope="text, record">
                  <a @click="downloadFile(record)"> {{ record.fileName }}</a>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <popup-accept-export v-if="visibleAcceptExport === true" :visibleAcceptExport="visibleAcceptExport" @closePopup="closePopup"></popup-accept-export>
    <popup-accept-successfully-delivery v-if="visibleAcceptDelivery === true" :visibleAcceptDelivery="visibleAcceptDelivery" @closePopup="closeAcceptDelivery"></popup-accept-successfully-delivery>
  </main-layout>
</template>
<script>
import MainLayout from '@/pages/layouts/MainLayout'
import {
  checkPrintVoucherImportExportManagement,
  getByIdImportExportManagement,
  printImportExportManagement
} from '@/api/import-export-management'
import moment from 'moment'
import columns from './columnsDetail'
import columnsDocument from './columnsDocument'
import PopupAcceptExport from './PopupAcceptExport'
import PopupAcceptSuccessfullyDelivery from './PopupAcceptSuccessfullyDelivery'
import _ from 'lodash'
import { getDetailFile } from '@/api/pre-order'

export default {
  components: {
    MainLayout,
    PopupAcceptExport,
    PopupAcceptSuccessfullyDelivery
  },
  data () {
    return {
      moment,
      columns,
      columnsDocument,
      activeKey: [1, 2, 3],
      form: {},
      data: [],
      dataDocument: [],
      pagination: {
        current: 1,
        total: 1,
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      paginationDocument: {
        current: 1,
        total: 1,
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loading: false,
      visibleAcceptExport: false,
      visibleAcceptDelivery: false
    }
  },
  created () {
    this.getById()
  },
  methods: {
    getById () {
      this.loading = true
      getByIdImportExportManagement({ voucherId: this.$route.params.id }).then(rs => {
        if (rs) {
          this.form = rs
          this.form.importAt = moment(rs.importAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.form.exportAt = moment(rs.exportAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.form.deliveredAt = moment(rs.deliveredAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.data = rs.listDetail
          this.dataDocument = rs.listDocument
          this.pagination = _.merge(this.pagination, this.handlePaginationData(rs.listDetail))
          this.paginationDocument = _.merge(this.paginationDocument, this.handlePaginationData(rs.listDocument))
        }
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
        this.loading = false
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
    },
    handleTableChangeDocument (pagination, filters, sorter) {
      this.paginationDocument = pagination
    },
    checkPrintVoucher () {
      const $this = this
      this.loading = true
      checkPrintVoucherImportExportManagement({ voucherId: this.$route.params.id }).then(rs => {
        if (rs === true) {
          this.loading = false
          this.$confirm({ content: 'Phiếu đã được in. Bạn có muốn tiếp tục in không?',
            okText: 'In',
            cancelText: 'Hủy',
            onOk () {
              $this.printVoucher()
            }
          })
        } else {
          $this.printVoucher()
          $this.loading = false
        }
      })
    },
    printVoucher () {
      const params = {
        voucherId: this.$route.params.id
      }
      this.loading = true
      printImportExportManagement(params).then(rs => {
        const date = new Date(moment())
        const fileName = 'Phieu_xuat_' + moment(date, 'YYYY_MM_DD ') + '.xlsx'
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(rs, fileName)
        } else {
          const downloadLink = window.document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(rs)
          downloadLink.download = fileName
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        }
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$error({ content: msg })
      }).finally(res => {
        this.loading = false
      })
    },
    showAcceptExport () {
      this.visibleAcceptExport = true
    },
    closePopup () {
      this.visibleAcceptExport = false
      this.getById()
    },
    showAcceptDelivery () {
      this.visibleAcceptDelivery = true
    },
    closeAcceptDelivery () {
      this.visibleAcceptDelivery = false
      this.getById()
    },
    goToBack () {
      this.$router.push({ name: 'voucher_management' })
    },
    downloadFile (record) {
      const fileType = record.fileName.substr(record.fileName.lastIndexOf('.'))
      if (fileType === '.pdf' || fileType === '.png' || fileType === '.jpg') {
        // bật tab review pdf
        getDetailFile({ documentId: record.id }).then(rs => {
          if (rs) {
            const fileName = record.fileName
            const data = this.base64toBlob(rs, fileName)
            var file = new Blob([data], { type: 'application/pdf' })
            var fileURL = URL.createObjectURL(file)
            window.open(fileURL)
          }
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$error({ content: msg })
        }).finally(res => {
          this.loadingPdf = false
        })
      } else {
        // Tải xuống
        getDetailFile({ documentId: record.id }).then(rs => {
          if (rs) {
            const fileName = record.fileName
            const data = this.base64toBlob(rs, fileName)
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(rs, fileName)
            } else {
              const downloadLink = window.document.createElement('a')
              downloadLink.href = window.URL.createObjectURL(data)
              downloadLink.download = fileName
              document.body.appendChild(downloadLink)
              downloadLink.click()
              document.body.removeChild(downloadLink)
            }
          }
        })
      }
    },
    base64toBlob (base64Data, contentType) {
      contentType = contentType || ''
      var sliceSize = 1024
      var byteCharacters = atob(base64Data)
      var bytesLength = byteCharacters.length
      var slicesCount = Math.ceil(bytesLength / sliceSize)
      var byteArrays = new Array(slicesCount)

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize
        var end = Math.min(begin + sliceSize, bytesLength)

        var bytes = new Array(end - begin)
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0)
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes)
      }
      return new Blob(byteArrays, { type: contentType })
    }
  }
}
</script>
