a<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item>Quản lý kế hoạch doanh thu</a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Lập kế hoạch doanh thu chi tiết</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Điều kiện tìm kiếm" key="1">
        <a-card style="width: 100%;border: none" class="search-container">
          <a-form-model
            ref="ruleForm"
            :model="filters"
            :rules="rules"
            @submit="search"
            layout="vertical">
            <a-row :gutter="16">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="planType" label="Kế hoạch doanh thu">
                  <a-select
                    :filter-option="filterSelectOption"
                    @change="onChangePlanType"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.planType"
                  >
                    <a-select-option
                      v-for="item in renderPlanType"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container" v-if="filters.planType === '1'">
                <a-form-model-item prop="month" label="Tháng">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.month"
                  >
                    <a-select-option :value="''">
                      -- Tất cả --
                    </a-select-option>
                    <a-select-option
                      v-for="item in renderMonth"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container" v-if="filters.planType === '2'">
                <a-form-model-item prop="quarter" label="Quý">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.quarter"
                  >
                    <a-select-option :value="''">
                      -- Tất cả --
                    </a-select-option>
                    <a-select-option
                      v-for="item in renderQuater"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="year" label="Năm">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.year"
                  >
                    <a-select-option :value="''">
                      -- Tất cả --
                    </a-select-option>
                    <a-select-option
                      v-for="item in renderYear"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                class="filter-item-container"
                style="display: flex;flex-wrap: wrap; margin-top: 17px;justify-content: center">
                <a-button class="btn-reset uppercase" style="margin-right: 1rem" @click="resetFilter">Nhập lại
                </a-button>
                <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm
                </a-button>
              </a-col>
            </a-row>
          </a-form-model>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Kết quả tìm kiếm" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>
            <a-col :span="12">
            </a-col>
            <a-col :span="12" class="btn-container">
              <a-button
                v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI')"
                class="ant-btn ant-btn-primary"
                :style="{marginRight: '8px'}"
                @click="gotoListg('businessPlanCreate')">
                <a-icon type="plus-circle"/>
                Thêm mới
              </a-button>

              <a-button
                v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI')"
                class="ant-btn ant-btn-primary"
                :style="{marginRight: '8px'}"
                @click="downloadFileTemplate"
                :disabled="false"
              >
                <a-icon
                  type="plus-circle"
                />
                TẢI FILE MẪU
              </a-button>
              <a-upload
                :multiple="false"
                :action="IMPORT_FILE"
                method="post"
                :headers="headers"
                :file-list="null"
                :accept="fileAccept"
                :customRequest="customRequest"
                :before-upload="beforeUpload"
              >
                <a-button
                  v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI')"
                  class="ant-btn ant-btn-primary"
                  :disabled="false"
                  :loading="loadingImport"
                  :style="{marginRight: '8px'}"
                  icon="plus-circle"
                >
                  IMPORT EXCEL
                </a-button>
              </a-upload>
            </a-col>
          </a-row>
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1">
                <div class="div1"></div>
              </div>
              <a-form-model ref="formValidate" :model="formValidate">
                <a-table
                  ref="tb1"
                  :columns="columns"
                  :data-source="data"
                  :rowKey=" (rowKey, index ) => index"
                  :pagination="data.length === 0 ? false : pagination"
                  :loading="loading"
                  :scroll="{ x: 'max-content' }"
                  :locale="{ emptyText: 'Chưa có dữ liệu' }"
                  @change="handleTableChange"
                  class="ant-table-bordered">
                  <template slot="actionTitle">
                    <a-icon type="control" :style="{fontSize: '14px'}"/>
                  </template>
                  <template slot="planType" slot-scope="text, record">
                    {{ getName(renderPlanType, record.planType) }}
                  </template>
                  <template slot="month" slot-scope="text, record">
                    {{ record.month === 0 ? null : 'Tháng ' + record.month }}
                  </template>
                  <template slot="rowIndex" slot-scope="text, record, index">
                    <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                  </template>
                  <template slot="quarter" slot-scope="text, record">
                    {{ record.quarter === 0 ? null : 'Quý ' + record.quarter }}
                  </template>
                  <template slot="year" slot-scope="text, record">
                    Năm {{ record.year }}
                  </template>
                  <template slot="revenueSum" slot-scope="text, record">
                    {{ formatPrice1(record.revenueSum) + ' VNĐ' }}
                  </template>
                  <template slot="operation" slot-scope="text, record">
                    <div>
                      <span @click="onDetailRow(record.revenuePlanId)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="info-circle"
                          :style="{color: '#ee0033',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="onEditRow(record.revenuePlanId)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="form"
                          :style="{color: '#ee0033',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="deleteById(record.revenuePlanId)" style="cursor: pointer">
                        <a-icon
                          type="delete"
                          :style="{color: '#ee0033', fontSize: '14px'}"
                        />
                      </span>
                    </div>
                  </template>
                </a-table>
              </a-form-model>
            </a-col>
          </a-row>
        </a-card>

      </a-collapse-panel>
    </a-collapse>

  </main-layout>
</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import _merge from 'lodash/merge'
import moment from 'moment'
import {
  deleteRevenuePlan,
  getProvince, importRevenuePlan,
  searchBusinessPlan
} from '@/api/businessPlan'
import TableEmptyText from '@/utils/table-empty-text'
import { globalListComputed, commonGlobalMethods } from '@/store/helpers'
import { DOWNLOAD_DOCUMENTDETAIL_URL_REVENUE, DOWNLOADFILETEMPLREREVENUE, IMPORT_FILE, UPLOAD_FILE } from '@/constants'
import { axios } from '@/utils/request'
import { Modal } from 'ant-design-vue'
import Vue from 'vue'
import excel from 'vue-excel-export'

Vue.use(excel)

function showModalSuccess (msg) {
  const modal = Modal.success()

  modal.update({
    title: 'Thông báo',
    content: msg
  })
}
function showModalError (msg) {
  const modal = Modal.error()

  modal.update({
    title: 'Thông báo',
    content: msg
  })
}

const columns = [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Mã Kế Hoạch',
    dataIndex: 'planCode',
    ellipsis: true,
    scopedSlots: { customRender: 'planCode' },
    align: 'left',
    width: 100
  },
  {
    title: 'Tên Kế Hoạch',
    dataIndex: 'planName',
    ellipsis: true,
    scopedSlots: { customRender: 'planName' },
    align: 'left',
    width: 100
  },
  {
    title: 'Loại Kế Hoạch',
    dataIndex: 'planType',
    scopedSlots: { customRender: 'planType' },
    align: 'left',
    width: 100
  },
  {
    title: 'Sản Phẩm',
    dataIndex: 'productName',
    ellipsis: true,
    scopedSlots: { customRender: 'productName' },
    align: 'left',
    width: 100
  },
  {
    title: 'Tháng',
    dataIndex: 'month',
    scopedSlots: { customRender: 'month' },
    align: 'left',
    width: 100
  },
  {
    title: 'Quý',
    dataIndex: 'quarter',
    scopedSlots: { customRender: 'quarter' },
    align: 'left',
    width: 100
  },
  {
    title: 'Năm',
    dataIndex: 'year',
    scopedSlots: { customRender: 'year' },
    align: 'left',
    width: 100
  },
  {
    title: 'Tổng Doanh Thu',
    dataIndex: 'revenueSum',
    scopedSlots: { customRender: 'revenueSum' },
    align: 'left',
    width: 100
  }
]
const columnsCreate = [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Tỉnh',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province' },
    align: 'left',
    width: 200
  }
]
export default {
  components: {
    MainLayout

  },
  mixins: [TableEmptyText],
  name: 'Profile',
  data () {
    return {
      activeSearchKey: 1,
      oldDataColums: 1,
      isDelBtn: true,
      loadingImport: false,
      fileAccept: UPLOAD_FILE.FILE_ACCEPT_EXCEl,
      activeResultKey: 1,
      data: [],
      dataForm: [],
      IMPORT_FILE,
      dataRow: [],
      columns,
      moment,
      columnsCreate,
      editColums: [],
      newColums: [],
      titleCoLums: [],
      listProvince: [],
      expandedRowKeys: [],
      headers: {
        authorization: 'authorization-text'
      },

      renderPlanType: [
        {
          id: '',
          name: '-- Tất cả --'
        },
        {
          id: '1',
          name: 'Tháng'
        },
        {
          id: '2',
          name: 'Quý'
        },
        {
          id: '3',
          name: 'Năm'
        }
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return `Tổng số dòng ${total}`
        }
      },
      paginationForm: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return `Tổng số dòng ${total}`
        }
      },
      loading: false,
      isLoadingCreate: false,
      filters: {
        planType: '1',
        month: moment().month() + 1,
        quarter: null,
        year: moment().year()
      },
      formPlan: {
        planType: '1',
        planName: '',
        id: null,
        month: '',
        quarter: '',
        year: ''
      },

      products: [],
      fetchData: {},
      fetchRow: {},
      currentProductGroupId: null,
      lastFetchId: 0,
      fetching: false,

    }
  },
  mounted () {
    this.getProvinceList()
    if (this.oldfillter) {
      this.filters = this.convertPropToSubmitDate(this.oldfillter)
      this.getData()
    }
  },

  computed: {

    convertMoney () {
      return {
        distractionFree: false,
        valueAsInteger: true,
        autoDecimalMode: true
      }
    },

    oldfillter () {
      const fillter = localStorage.getItem('businessPlan.fillters')
      return JSON.parse(fillter)
    },

  },
  methods: {

    onTrim (string) {
      return string.trim()
    },
    onEditRow (record) {
      this.$router.push({ name: 'businessPlanUpdate', params: { businessId: record } })
    },
    onDetailRow (record) {
      this.$router.push({ name: 'businessPlanDetail', params: { businessId: record } })
    },

    openCreateProvince () {
      this.modalCreateTypeProvince = true
    },
    downloadFileTemplate () {
      const url = DOWNLOADFILETEMPLREREVENUE + '?fileName=' + 'them_moi_ke_hoach_theo_lo.xlsx'
      window.open(url, '_blank')
    },
    getName (arr, id) {
      if (id !== '') {
        for (var i in arr) {
          if (arr.hasOwnProperty(i) && arr[i].id === id) {
            return arr[i].name
          }
        }
      }
      return null
    },
    // createCol () {
    //   if (this.fetchData) {
    //     if (this.fetchData.length > 1) {
    //       this.columnsCreate = [
    //         {
    //           slots: { title: 'actionTitle' },
    //           dataIndex: 'operation',
    //           scopedSlots: { customRender: 'operation' },
    //           width: 50,
    //           align: 'center'
    //         },
    //         {
    //           title: 'STT',
    //           dataIndex: 'rowIndex',
    //           scopedSlots: {
    //             customRender: 'rowIndex'
    //           },
    //           align: 'center',
    //           ellipsis: true,
    //           width: 80
    //         },
    //         {
    //           title: 'Tỉnh',
    //           dataIndex: 'province',
    //           scopedSlots: { customRender: 'province' },
    //           align: 'left',
    //           width: 100
    //         }
    //       ]
    //     }
    //     const arrNameColums = []
    //     this.columnsCreate.forEach(item => {
    //       arrNameColums.push(item.dataIndex)
    //     })
    //     let isCheckTotalCol = null
    //     if (arrNameColums.length > 1) {
    //       isCheckTotalCol = true
    //     }
    //     if (!isCheckTotalCol) {
    //       this.$error({ title: 'Thông báo', content: 'Không thể thêm mới' })
    //     } else {
    //       for (let i = 0; i < 1; i++) {
    //         const oldData = this.fetchData.map(item => {
    //           return {
    //             title: item.productCode,
    //             operation: 'operation',
    //             actionTitle: 'actionTitle',
    //             dataIndex: item.productId,
    //             scopedSlots: { customRender: item.productId },
    //             align: 'center',
    //             width: 100
    //           }
    //         })
    //         oldData.forEach(item => {
    //           this.columnsCreate.push(item)
    //           this.editColums.push(item)
    //         })
    //       }
    //       const data = this.dataRow.map(item => {
    //         item[this.fetchData.productId] = ''
    //         return item
    //       })
    //       this.dataRow = [...data]
    //       this.modalCreateType = false
    //       const isCheckExist = arrNameColums.includes(this.fetchData[0].productId)
    //       this.fetchData = []
    //       if (isCheckExist) {
    //         this.$error({ title: 'Thông báo', content: 'Loại dịch vụ đã tồn tại' })
    //         this.columnsCreate.pop()
    //         this.editColums.pop()
    //       }
    //     }
    //   }
    // },
    // async appendRowEmpty (numberRow) {
    //   const { dataForm } = this
    //   if (dataForm.length + numberRow > this.pagination.pageSize) {
    //     dataForm.splice(this.pagination.pageSize - numberRow, numberRow)
    //   }
    //   for (let i = 0; i < numberRow; i++) {
    //     this.fetchRow.forEach(items => {
    //       const newData = this.columnsCreate.map(item => {
    //         return item.dataIndex
    //       })
    //       const obj = {}
    //       newData.forEach(item => {
    //         obj[item] = ''
    //         obj['province'] = items.areaCode
    //       })
    //       this.dataRow.push(obj)
    //     })
    //   }
    //   this.modalCreateType = false
    //   this.modalCreateTypeProvince = false
    //   this.isLoadingCreate = false
    // },
    create () {
      this.modalVisible = true
    },
    // addRow () {
    //   const that = this
    //   that.isLoadingCreate = true
    //   setTimeout(function () {
    //     that.appendRowEmpty(1)
    //   }, 3000)
    //   this.saveRow()
    // },
    // fetchDataCol (data) {
    //   if (data.length === undefined) {
    //     this.fetchData = [{ ...data }]
    //   } else {
    //     this.fetchData = data
    //   }
    // },
    // fetchDataRow (data) {
    //   this.fetchRow = data
    // },
    // openCreateService () {
    //   this.modalCreateType = true
    // },
    // openDeleteService () {
    //   this.modalDeleteType = true
    // },
    deleteById (revenuePlanId) {
      const that = this
      if (revenuePlanId) {
        that.$confirm({
          title: 'Bạn có chắc chắn muốn xóa?',
          onOk () {
            const params = {
              revenuePlanId: revenuePlanId,
              status: '3'
            }
            deleteRevenuePlan(params).then(res => {
              that.$success({ title: 'Xóa kế hoạch doanh thu chi tiết thành công' })
              that.getData()
            })
          }
        })
      }
    },
    search () {
      this.pagination.current = 1
      this.getData()
    },
    confirmCreate () {
      const that = this
      that.$refs['creatingForm'].validate(valid => {
        if (valid) {
          that.$confirm({
            title: 'Bạn có chắn muốn thêm mới?',
            onOk () {
              that.doCreate()
            }
          })
        }
      })
    },
    // confirmUpdate () {
    //   const that = this
    //   that.$refs['creatingForm'].validate(valid => {
    //     if (valid) {
    //       that.$confirm({
    //         title: 'Bạn có chắn muốn cập nhật không?',
    //         onOk () {
    //           that.doUpdate()
    //         }
    //       })
    //     }
    //   })
    // },
    // async doCreate () {
    //   const params = {
    //     'lstRevenuePlanDetail': [
    //     ],
    //     'month': this.formPlan.month !== '' ? this.formPlan.month : null,
    //     'planType': this.formPlan.planType !== '' ? this.formPlan.planType : null,
    //     'year': this.formPlan.year !== '' ? this.formPlan.year : null,
    //     'quarter': this.formPlan.quarter !== '' ? this.formPlan.quarter : null,
    //     'status': 1
    //   }
    //
    //   this.dataRow.forEach(row => {
    //     const exclusions = ['operation', 'rowIndex', 'province', 'productId', 'revenue']
    //     const item = {
    //       'lstRevenueProduct': [
    //       ],
    //       'province': row.province
    //     }
    //     Object.keys(row).forEach(k => {
    //       if (exclusions.indexOf(k) === -1) {
    //         if (row.hasOwnProperty(k)) {
    //           item.lstRevenueProduct.push({
    //             'productId': k,
    //             'revenue': row[k].toString().replace(/₫/g, '').replace(/,/g, '')
    //           })
    //         }
    //       }
    //     })
    //     params.lstRevenuePlanDetail.push(item)
    //   })
    //   createRevenuePlane(params).then(res => {
    //     this.$success({ title: 'Thêm kế hoạch doanh thu thàng công' })
    //     this.resetCreate()
    //     this.modalVisible = false
    //   }).catch(err => {
    //     const msg = this.handleApiError(err)
    //     this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
    //   }).finally(() => {
    //     this.loading = false
    //   })
    // },
    // async doUpdate () {
    //   const that = this
    //   const params = {
    //     'lstRevenuePlanDetail': [
    //     ],
    //     'month': this.formPlan.month !== '' ? this.formPlan.month : null,
    //     'planType': this.formPlan.planType !== '' ? this.formPlan.planType : null,
    //     'year': this.formPlan.year !== '' ? this.formPlan.year : null,
    //     'quarter': this.formPlan.quarter !== '' ? this.formPlan.quarter : null,
    //     'revenuePlanId': this.formPlan.id !== '' ? this.formPlan.id : null,
    //     'status': 1
    //   }
    //
    //   this.dataRow.forEach(row => {
    //     const exclusions = ['operation', 'rowIndex', 'province', 'productId', 'revenue']
    //     const item = {
    //       'lstRevenueProduct': [
    //       ],
    //       'province': row.province
    //     }
    //     Object.keys(row).forEach(k => {
    //       if (exclusions.indexOf(k) === -1) {
    //         if (row.hasOwnProperty(k)) {
    //           item.lstRevenueProduct.push({
    //             'productId': k,
    //             'revenue': that.trimRemove(row[k]).replace(/₫/g, '').replace(/,/g, '')
    //           })
    //         }
    //       }
    //     })
    //     params.lstRevenuePlanDetail.push(item)
    //   })
    //   updateRevenuePlan(params).then(res => {
    //     this.$success({ title: 'Cập kế hoạch doanh thu thàng công' })
    //     this.modalVisible = false
    //     this.resetCreate()
    //     this.getData()
    //   }).catch(err => {
    //     const msg = this.handleApiError(err)
    //     this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
    //   }).finally(() => {
    //     this.loading = false
    //   })
    // },
    importFile () {
      importRevenuePlan().then(res => {
        // console.log(res)
      })
    },
    getData () {
      const that = this
      that.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const params = {
            page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
            size: this.pagination.pageSize
          }
          that.loading = true
          that.data = []
          searchBusinessPlan(_merge(params, that.filters)).then(res => {
            that.data = that.convertPropToDisplayDate(res)
            localStorage.setItem('businessPlan.fillters', JSON.stringify(this.filters))
            that.pagination.total = that.data.length
            that.loading = false
          }).catch(err => {
            const msg = that.handleApiError(err)
            that.$error({ content: msg })
          }).finally(res => {
            that.loading = false
          })
        }
      })
    },

    resetFilter () {
      this.filters = {
        planType: this.filters.planType,
        month: '',
        quarter: '',
        year: ''
      }
      this.data = []
      if (this.data.length <= 0) {
        this.pagination = {
          current: 1,
          total: 1,
          pageSize: 15,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['15', '25', '50'],
          showTotal: (total) => {
            return `Tổng số dòng ${total}`
          }
        }
        this.loading = false
      }
    },
    // resetCreate () {
    //   this.editColums = []
    //   this.dataRow = []
    //   this.formPlan = {
    //     planType: '1',
    //     id: null,
    //     month: '',
    //     quarter: '',
    //     year: ''
    //   }
    //   this.columnsCreate = [
    //     {
    //       slots: { title: 'actionTitle' },
    //       dataIndex: 'operation',
    //       scopedSlots: { customRender: 'operation' },
    //       width: 50,
    //       align: 'center'
    //     },
    //     {
    //       title: 'STT',
    //       dataIndex: 'rowIndex',
    //       scopedSlots: {
    //         customRender: 'rowIndex'
    //       },
    //       align: 'center',
    //       ellipsis: true,
    //       width: 80
    //     },
    //     {
    //       title: 'Tỉnh',
    //       dataIndex: 'province',
    //       scopedSlots: { customRender: 'province' },
    //       align: 'left',
    //       width: 200
    //     }
    //   ]
    // },
    handleCancel () {
      this.modalVisible = false
      this.resetCreate()
    },
    handleCancelDel () {
      this.modalDeleteType = false
      this.isDelBtn = true
    },
    handleCancelCreate () {
      this.modalCreateType = false
      this.fetchData = {}
    },

    handleCancelCreateType () {
      this.modalCreateType = false
    },

    onChangeRow (index, record) {
      this.$confirm({
        title: 'Bạn muốn thay đổi phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          const data = [...this.dataRow]
          const newData = []
          for (let i = 0; i < data.length; i++) {
            if (i !== index) {
              newData.push(data[i])
            }
          }
          this.dataRow = newData
        }
      })
    },

    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },

    fetchColums (colums) {
      this.oldDataColums = colums.dataIndex
      if (colums) {
        this.isDelBtn = false
        this.newColums = this.editColums.filter(item => item.dataIndex !== colums.dataIndex)
        this.titleCoLums = this.columnsCreate.filter(item => item.dataIndex !== colums.dataIndex)
      }
    },
    doDelColums () {
      const colums = this.newColums
      const listTitle = this.titleCoLums
      if (colums && listTitle) {
        this.editColums = colums
        this.columnsCreate = listTitle
        const oldData = this.oldDataColums
        this.dataRow.forEach(item => {
          delete item[oldData]
        })
        this.modalDeleteType = false
      }
    },
    beforeUpload (file) {
      this.loadingImport = true
      setTimeout(() => {
        const regx = new RegExp(/(?:\.([^.]+))?$/)
        let fileExt = regx.exec(file.name)
        if (fileExt) {
          fileExt = fileExt[0]
        }
        if (file.size > 10485760) { // 10MB
          this.$error({
            title: 'Thông báo lỗi',
            content: 'Dung lượng file không được lớn hơn 10MB'
          })
        } else if (fileExt && this.fileAccept.split(',').indexOf(fileExt) === -1) {
          this.$error({
            title: 'Thông báo lỗi',
            content: 'Chỉ chấp nhận các file excel'
          })
        } else {
          this.loadingImport = false
          return true
        }
        this.loadingImport = false
        return false
      }, 1000)
    }
    // saveRow (record) {
    //   const params = {
    //     revenuePlanId: record.revenuePlanId
    //   }
    //   findByIdRevenuePlane(params).then(res => {
    //     if (res) {
    //       let lstData = []
    //       const data = []
    //       const editColums = [...res.lstProductCode]
    //       this.modalVisible = true
    //       this.formPlan = {
    //         id: res.revenuePlanId,
    //         month: res.month,
    //         quarter: res.quarter,
    //         planType: res.planType,
    //         year: res.year
    //       }
    //       this.editColums = editColums.map((item, index) => {
    //         return {
    //           title: item.productCode,
    //           operation: 'operation',
    //           actionTitle: 'actionTitle',
    //           dataIndex: item.productId,
    //           scopedSlots: { customRender: item.productId },
    //           align: 'center',
    //           width: 100
    //         }
    //       })
    //       this.editColums.forEach(item => {
    //         this.columnsCreate.push(item)
    //       })
    //       res.lstRevenuePlanDetail.forEach((item, index) => {
    //         lstData = item.lstRevenueProduct.map(subItem => {
    //           subItem[subItem.productId] = subItem.revenue
    //           subItem['province'] = item.province
    //           return subItem
    //         })
    //         data.push(lstData)
    //       })
    //       const dataTable = []
    //       data.forEach((item, index) => {
    //         Object.assign(...item)
    //         dataTable.push(item[0])
    //       })
    //       this.dataRow = dataTable
    //     }
    //   })
    // }
  }
}
</script>
