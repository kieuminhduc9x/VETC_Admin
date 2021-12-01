<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tổng hợp theo tháng</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleFilter"
      :model="filters"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm báo cáo doanh thu" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="supplierCode" label="Nhà bán hàng">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.supplierCode"
                    @change="changeSupplierCode"
                  >

                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                    <a-select-option
                      v-for="item in listSupplierCode"
                      :key="'t-p-' + item.hrvSupplierId"
                      :value="item.code">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="month"
                  label="Tháng"
                  :rules="[
                    {
                      required: true,
                      message: 'Tháng là bắt buộc',
                      trigger: 'change'
                    }
                  ]">
                  <a-month-picker
                    placeholder="mm/yyyy"
                    v-model="filters.month"
                    :show-time="false"
                    format="MM/YYYY"
                    @change="changeMonth"
                  />
                </a-form-model-item>
              </a-col>
              <!--              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">-->
              <!--                <a-form-model-item-->
              <!--                  label="Trạng thái đơn hàng"-->
              <!--                  prop="status"-->
              <!--                  :rules="[]">-->
              <!--                  <a-select-->
              <!--                    style="width: 100%"-->
              <!--                    v-model="filters.status"-->
              <!--                    @change="changeStatus"-->
              <!--                    :allowClear="true"-->
              <!--                  >-->
              <!--                    <a-select-option v-for="item in listStatus" :key="item.value" :value="item.value">-->
              <!--                      {{ item.name }}-->
              <!--                    </a-select-option>-->
              <!--                  </a-select>-->
              <!--                </a-form-model-item>-->
              <!--              </a-col>-->
            </a-row>
            <a-row :gutter="16">
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                class="filter-item-container"
                style="display: flex;flex-wrap: wrap; margin-top: 17px; justify-content: center">
                <!--                <a-button :loading="loading" :disabled="loadingPdf || loadingExport" type="primary" class="btn-success uppercase" @click="search">Tìm kiếm-->
                <!--                </a-button>-->
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-left: 10px">
                  Nhập lại
                </a-button>
                <a-button
                  :loading="loadingExport"
                  :disabled="loadingPdf || loading"
                  type="primary"
                  class="btn-success uppercase"
                  style="margin-left: 10px"
                  @click="exportExcel('xlsx')">Xuất Excel
                </a-button>
                <a-button
                  :loading="loadingPdf"
                  :disabled="loadingExport || loading"
                  type="primary"
                  class="btn-success uppercase"
                  style="margin-left: 10px"
                  @click="exportPdf('pdf')">Preview
                </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <!--    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">-->
    <!--      <a-collapse-panel header="Kết quả tìm kiếm" key="1">-->
    <!--        <a-card style="width: 100%; border: none" class="vts-table-container">-->
    <!--          <a-row :gutter="16" type="flex">-->
    <!--            <a-col :span="24">-->
    <!--              <div class="wrapper1">-->
    <!--                <div class="div1"></div>-->
    <!--              </div>-->
    <!--              <a-table-->
    <!--                ref="tb1"-->
    <!--                :columns="columns"-->
    <!--                :data-source="data"-->
    <!--                :rowKey=" (rowKey, index ) => index"-->
    <!--                :pagination="data.length === 0 ? false : pagination"-->
    <!--                :loading="loading"-->
    <!--                :scroll="{ x: '100%' }"-->
    <!--                :locale="{ emptyText: 'Chưa có dữ liệu' }"-->
    <!--                @change="handleTableChange"-->
    <!--                class="ant-table-bordered">-->
    <!--                <template slot="actionTitle">-->
    <!--                  <a-icon type="control" :style="{fontSize: '14px'}"/>-->
    <!--                </template>-->
    <!--                <template slot="rowIndex" slot-scope="text, record, index">-->
    <!--                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>-->
    <!--                </template>-->
    <!--              </a-table>-->
    <!--            </a-col>-->
    <!--          </a-row>-->
    <!--        </a-card>-->
    <!--      </a-collapse-panel>-->
    <!--    </a-collapse>-->
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import { searchSalesRevenue } from '@/api/sales_revenue'
import { commonMethods, authComputed } from '@/store/helpers'
import moment from 'moment'
import { exportReport, previewReport } from '@/api/report'
import pdf from 'vue-pdf'
import { getListSupplier } from '@/api/order'
// import { getListSupplier } from '@/api/order'
// import { SearchGlobalListValue } from '@/api/global_list'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    pdf
  },
  mixins: [TableEmptyText],
  name: 'SalesRevenue',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      activeSearchKey: 1,
      activeResultKey: 1,
      data: [],
      expandedRowKeys: [],
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
      columns,
      filters: {
        // status: '',
        // statusName: '',
        fromDate: '',
        toDate: '',
        month: '',
        supplierName: '',
        supplierCode: ''
      },
      listSupplierCode: [],
      listStatus: [
        {
          value: '1',
          name: 'Mới tạo đơn'
        },
        {
          value: '2',
          name: 'Đang giao'
        },
        {
          value: '3',
          name: 'Giao hàng thành công'
        },
        {
          value: '4',
          name: 'Chuyển hoàn'
        },
        {
          value: '5',
          name: 'Đã hủy'
        },
        {
          value: '8',
          name: 'Chờ đặt giao hàng lại'
        }
      ],
      dataPdf: '',
      loadingExport: false,
      loadingPdf: false
    }
  },
  created () {
    this.getListSupplier()
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    getListSupplier () {
      getListSupplier({}).then(rs => {
        if (rs) {
          this.listSupplierCode = rs
        }
      })
    },
    changeMonth (value) {
      if (value) {
        this.filters.fromDate = moment(value).startOf('month')
      }
    },
    changeSupplierCode (value) {
      if (value) {
        this.listSupplierCode.forEach((item) => {
          if (item.code === value) {
            this.filters.supplierName = item.name
          }
        })
      }
    },
    changeStatus (value) {
      if (value) {
        this.listStatus.forEach((item) => {
          if (item.value === value) {
            this.filters.statusName = item.name
          }
        })
      }
    },
    resetForm (e) {
      this.$refs.ruleFilter.resetFields()
      this.search(e)
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    search () {
      this.$refs.ruleFilter.validate(valid => {
        if (valid) {
          this.pagination.current = 1
          this.getData()
        }
      })
    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = false
      this.data = []
      searchSalesRevenue(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.data = this.data.map(item => {
          return _merge(item, { status: item.status === '1' })
        })
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
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
    exportExcel (type) {
      this.$refs.ruleFilter.validate(valid => {
        if (valid) {
          const params = {
            fileType: type,
            params: {
              fromDate: this.filters.fromDate ? moment(this.filters.fromDate).format('YYYY-MM') : null,
              toDate: this.filters.toDate ? moment(this.filters.toDate).format('YYYY-MM') : null,
              supplierCode: this.filters.supplierCode,
              supplierName: this.filters.supplierCode !== '' ? this.filters.supplierName : 'Tất cả'
              // status: this.filters.status,
              // statusName: this.filters.status !== '' ? this.filters.statusName : 'Tất cả'
            },
            reportName: 'report_summary_revenue_by_month'
          }
          this.loadingExport = true
          exportReport(params)
            .then(rs => {
              const date = new Date(moment())
              const fileName = 'Bao_cao_tong_hop_theo_thang_' + moment(date, 'YYYY_MM_DD') + '.' + type
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
              this.loadingExport = false
            })
        }
      })
    },
    exportPdf (type) {
      this.$refs.ruleFilter.validate(valid => {
        if (valid) {
          const params = {
            fileType: type,
            params: {
              fromDate: this.filters.fromDate ? moment(this.filters.fromDate).format('YYYY-MM') : null,
              toDate: this.filters.toDate ? moment(this.filters.toDate).format('YYYY-MM') : null,
              supplierCode: this.filters.supplierCode,
              supplierName: this.filters.supplierCode !== '' ? this.filters.supplierName : 'Tất cả'
              // status: this.filters.status,
              // statusName: this.filters.status !== '' ? this.filters.statusName : 'Tất cả'
            },
            reportName: 'report_summary_revenue_by_month'
          }
          this.loadingPdf = true
          previewReport(params)
            .then(rs => {
              var file = new Blob([rs], { type: 'application/pdf' })
              var fileURL = URL.createObjectURL(file)
              window.open(fileURL)
            }).catch(err => {
              const msg = this.handleApiError(err)
              this.$error({ content: msg })
            }).finally(res => {
              this.loadingPdf = false
            })
        }
      })
    }

  }
}
</script>
