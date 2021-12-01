<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Gộp vận đơn hàng không AWB tại Hub đầu</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm vận đơn" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item label="Từ Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    :disabled="true"
                    v-model="currentUser.province"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
                    </a-select-option>

                    <a-select-option
                      v-for="item in listFromProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="toProvince" label="Đến Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.toProvince"
                    @change="changeToProvince"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
                    </a-select-option>

                    <a-select-option
                      v-for="item in listToProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="flightScheduleId" label="Khung giờ bay">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.flightScheduleId"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
                    </a-select-option>

                    <a-select-option
                      v-for="item in listFilghtSchedule"
                      :key="'p-g-' + item.flightScheduleId"
                      :value="item.flightScheduleId">{{ item.fromTime + ' - ' + item. toTime }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="productType" label="Loại hàng hóa">

                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.productType"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
                    </a-select-option>
                    <a-select-option
                      v-for="item in listProductType"
                      :key="'t-p-' + item.productId"
                      :value="item.productId">{{ item.productName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

              </a-col>

              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="orderId" label="Mã vận đơn">
                  <a-input v-model="filters.orderId"/>
                </a-form-model-item>

              </a-col>

            </a-row>
            <a-row :gutter="16">
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                class="filter-item-container"
                style="display: flex;flex-wrap: wrap; margin-top: 17px; justify-content: center">
                <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm
                </a-button>
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-left: 10px">
                  Nhập lại
                </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách vận đơn" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>

            <a-col :span="24" class="cus-flex-end">
              <a-button
                :disabled="selectedRowKeys.length <= 1"
                class="ant-btn ant-btn-primary"
                :style="{marginLeft: '8px'}"
                @click="groupAwb">
                Gộp AWB
              </a-button>

            </a-col>
          </a-row>
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
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :scroll="{ x: 'max-content' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                class="ant-table-bordered">

                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>

                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>

                <template slot="operation" slot-scope="text, record">
                  <div>
                    <span
                      @click="onDetailRow(record)"
                      class="vna-link"
                      style="padding-right:12px;cursor: pointer">
                      <span>Xem</span>
                    </span>
                    <span
                      @click="onEditWeight(record)"
                      class="vna-link"
                      style="padding-right:12px;cursor: pointer">
                      <span>Sửa</span>
                    </span>
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>

        <a-modal
          title="Gộp vận đơn hàng không AWB"
          :visible="showGroupForm"
          :footer="null"
          :width="1000"
          @cancel="handleCancelGroup"
        >
          <group-form
            :awb-obj="groupAWBObj"
            @closePopup="showGroupForm = false"
            @closePopupReload="groupAWBDone"
            v-if="showGroupForm"/>
        </a-modal>

      </a-collapse-panel>
    </a-collapse>

    <a-modal
      title="Cập nhật khối lượng"
      :visible="showEditForm"
      :footer="null"
      width="50%"
      :maskClosable="false"
      @cancel="handleCancelEditForm"
    >
      <FormUpdateOrder :awbObj="awbObj" @closePopup="handleCancelEditForm"/>
    </a-modal>

  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import columns from './columns'
import { authComputed, commonMethods } from '@/store/helpers'
import { ProductSearch, SearchOrderToMerge } from '@/api/order'
import _merge from 'lodash/merge'
import _findIndex from 'lodash/findIndex'
import GroupForm from './FormGroup'
import FormUpdateOrder from './FormUpdateOrder'
import { GetFlightScheduleMergeOrder } from '@/api/flight'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    GroupForm,
    FormUpdateOrder
  },
  mixins: [TableEmptyText],
  name: 'GroupAWB',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    const validateOrderIdText = (rule, value, callback) => {
      const numbersOnly = /^\d+$/
      if (value && !(numbersOnly.test(value))) {
        callback(new Error('Mã vận đơn không hợp lệ'))
      } else {
        this.$refs.ruleForm.validateField('orderId')
        callback()
      }
    }
    return {
      showEditForm: false,
      activeSearchKey: 1,
      activeResultKey: 1,
      data: [],
      selectedRowKeys: [],
      expandedRowKeys: [],
      listProductType: [],
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
        toProvince: '',
        flightScheduleId: '',
        productType: '',
        orderId: ''
      },
      rules: {
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
        ],
        flightCode: [
          { required: true, message: 'Mã chuyến bay không được phép trống' }
        ],
        orderId: [
          { validator: validateOrderIdText, trigger: 'change' }
        ]
      },
      endOpen: false,
      listProvinces: [],
      listFromProvinces: [],
      listToProvinces: [],
      showGroupForm: false,
      confirmLoading: false,
      groupAWBObj: {
        fromProvince: {},
        toProvince: {},
        listOrder: [],
        flightTimeFrame: ''
      },
      awbObj: {},
      listFilghtSchedule: []
    }
  },
  mounted () {
    if (this.oldfillter) {
      this.filters = this.convertPropToSubmitDate(this.oldfillter)
      this.getData()
    }
  },
  created () {
    this.getProvinces()
    this.fetchProductType()
  },
  computed: {
    ...authComputed,
    formValidate () {
      return {
        items: this.data
      }
    },
    oldfillter () {
      const fillter = window.localStorage.getItem('groupawb.fillters')
      return JSON.parse(fillter)
    }
  },
  methods: {
    ...commonMethods,
    changeToProvince () {
      if (this.filters.toProvince) {
        this.getFlightScheduleMergeOrder()
      }
    },
    getFlightScheduleMergeOrder () {
      const params = {
        fromProvince: this.currentUser.province,
        toProvince: this.filters.toProvince
      }

      GetFlightScheduleMergeOrder(params).then(res => {
        this.listFilghtSchedule = res
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
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
        this.listFromProvinces = res
      })
    },
    fetchProductType () {
      ProductSearch({ isPagination: false }).then(res => {
        this.listProductType = res.data
      })
    },
    handleSearchFrom (value) {
      this.listFromProvinces = this.listProvinces.filter(item => this.slugify(item.provinceName.toLowerCase(), ' ').indexOf(this.slugify(value.toLowerCase()), ' ') !== -1)
    },
    handleSearchTo (value) {
      this.listToProvinces = this.listProvinces.filter(item => this.slugify(item.provinceName.toLowerCase(), ' ').indexOf(this.slugify(value.toLowerCase()), ' ') !== -1)
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.search()
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: record.orderId }, query: { from: 'groupawb' } })
    },
    onTrim (string) {
      return string.trim()
    },

    rowKey (record, index) {
      record.rowKey = index
      return record.rowKey
    },
    expandRow (expand, record) {
      if (expand) {
        this.expandedRowKeys = [...this.expandedRowKeys, record.rowKey]
      } else {
        this.expandedRowKeys = this.expandedRowKeys.filter(rowKey => rowKey !== record.rowKey)
      }
    },
    reloadData () {

    },

    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    search (e) {
      e.preventDefault()
      this.$refs.ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.pagination.current = 1
          this.bindGroupAwbObj()
          this.getData()
        }
      })
    },
    bindGroupAwbObj () {
      if (this.filters.flightScheduleId) {
        const indx = _findIndex(this.listFilghtSchedule, { flightScheduleId: this.filters.flightScheduleId })
        if (indx >= 0) {
          this.groupAWBObj.flightTimeFrame = this.listFilghtSchedule[indx].flightTimeFrame
        }
      }

      const fromProvinceIndex = _findIndex(this.listProvinces, { provinceCode: this.currentUser.province })
      this.groupAWBObj.fromProvince = this.listProvinces[fromProvinceIndex]
      const toProvinceIndex = _findIndex(this.listProvinces, { provinceCode: this.filters.toProvince })
      this.groupAWBObj.toProvince = this.listProvinces[toProvinceIndex]
    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      SearchOrderToMerge(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
        window.localStorage.setItem('groupawb.fillters', JSON.stringify(this.filters))
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
    groupAwb () {
      this.groupAWBObj.listOrder = []
      var i = 0
      var frameTime = null
      for (i = 0; i < this.selectedRowKeys.length; i++) {
        const order = this.data[this.selectedRowKeys[i]]
        if (frameTime !== null && frameTime !== order.flightTimeFrame) {
          this.$notification.error({
            message: '',
            description: 'Các đơn hàng được chọn không cùng khung thời gian',
            duration: 5
          })
          return
        }
        frameTime = order.flightTimeFrame
        this.groupAWBObj.flightScheduleId = order.flightScheduleId
        this.groupAWBObj.flightTimeFrame = frameTime
        this.groupAWBObj.listOrder.push(order)
      }
      this.showGroupForm = true
    },
    handleCancelGroup () {
      this.showGroupForm = false
    },
    groupAWBDone () {
      this.showGroupForm = false
      this.selectedRowKeys = []
      this.getData()
    },
    onEditWeight (record) {
      this.showEditForm = true
      this.awbObj = {
        toProvince: record.toProvince,
        toProvinceName: record.toProvince,
        fromProvince: record.fromProvince,
        fromProvinceName: record.fromProvince,
        weight: record.weight,
        orderId: record.orderId,
        productTypeName: record.productTypeName,
        flightCode: record.flightCode,
        flightTimeFrame: record.flightTimeFrame
      }
    },
    handleCancelEditForm () {
      this.showEditForm = false
      this.getData()
    }

  }
}
</script>
