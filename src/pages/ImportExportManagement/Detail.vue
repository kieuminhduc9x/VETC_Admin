<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="/import-export-management">Quản lý nhập xuất</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Chi tiết</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-form-model
      ref="ruleForm"
      :model="form"
      layout="vertical">
      <a-collapse v-model="activeKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Thông tin chi tiết" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  label="Tên kho"
                  prop="warehouseName"
                  :rules="[]">
                  <a-input
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
                  <a-button style="margin-right: 1rem" @click="checkPrintVoucher">In phiếu xuất</a-button>
                  <a-button type="primary" style="margin-right: 1rem" @click="showAcceptExport">Xác nhận xuất hàng</a-button>
                  <a-button v-if="String(form.status) === '2'" type="primary" style="margin-right: 1rem" @click="showAcceptDelivery">Xác nhận giao hàng thành công</a-button>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-collapse v-model="activeKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách đơn hàng" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1">
                <div class="div1"></div>
              </div>
              <a-table
                ref="tb1"
                :columns="columns"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="false"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="actionTitle" >
                  <a-icon type="control"></a-icon>
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
import { checkPrintVoucherImportExportManagement, getByIdImportExportManagement } from '@/api/import-export-management'
import { previewReport } from '@/api/report'
import moment from 'moment'
import columns from './columnsDetail'
import PopupAcceptExport from './PopupAcceptExport'
import PopupAcceptSuccessfullyDelivery from './PopupAcceptSuccessfullyDelivery'

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
      activeKey: [1, 2, 3],
      form: {},
      data: [],
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
      getByIdImportExportManagement({ voucherId: this.$route.params.id }).then(rs => {
        if (rs) {
          this.form = rs
          this.form.importAt = moment(rs.importAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.form.exportAt = moment(rs.exportAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.form.deliveredAt = moment(rs.deliveredAt, 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.data = rs.listDetail
        }
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    checkPrintVoucher () {
      const $this = this
      checkPrintVoucherImportExportManagement({ voucherId: this.$route.params.id }).then(rs => {
        if (rs === true) {
          this.$confirm({ content: 'Phiếu đã được in. Bạn có muốn tiếp tục in không?',
            okText: 'In',
            cancelText: 'Hủy',
            onOk () {
              $this.printVoucher()
            }
          })
        } else {
          $this.printVoucher()
        }
      })
    },
    printVoucher () {
      const params = {
        fileType: 'pdf',
        params: {
        },
        reportName: 'voucher'
      }
      this.loadingPdf = true
      previewReport(params).then(rs => {
        var file = new Blob([rs], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file)
        window.open(fileURL)
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$error({ content: msg })
      }).finally(res => {
        this.loadingPdf = false
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
    }
  }
}
</script>
