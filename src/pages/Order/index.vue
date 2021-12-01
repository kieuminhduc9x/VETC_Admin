<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tra cứu thông tin vận đơn</a-breadcrumb-item>
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
          <a-card style="width: 100%;border: none" class="search-container" >
            <a-row :gutter="16">
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="fromProvince" label="Từ Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.fromProvince"
                    @change="changeFromProvince"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>

                    <a-select-option

                      v-for="item in listProvinces"
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
                    @change="changeToProvince"
                    show-search
                    style="width: 100%"
                    v-model="filters.toProvince"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                    <a-select-option
                      v-for="item in listToProvinces"
                      :key="'t-p-' + item.provinceCode"
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
                      v-for="item in listFlightSchedule"
                      :key="'t-p-' + item.flightScheduleId"
                      :value="item.flightScheduleId">{{ item.fromTime + ' - ' + item.toTime }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="orderId" label="Mã vận đơn">
                  <a-input v-model="filters.orderId"/>
                </a-form-model-item>

              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="shippingStatus" label="Bước vận chuyển">
                  <a-select
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.shippingStatus"
                  >
                    <a-select-option
                      v-for="item in listShippingStatusNotDup"
                      :key="'p-g-' + item.value"
                      :value="item.value">{{ item.name }}
                    </a-select-option>
                  </a-select>
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
                <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm </a-button>
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-left: 10px">Nhập lại </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách vận đơn" key="1">
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
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :scroll="{ x: 'max-content' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <div>
                    <span
                      @click="onDetailRow(record)"
                      class="vna-link" >
                      <span>Xem</span>
                    </span>
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>

  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import columns from './columns'
import _ from 'lodash'
import { authComputed, commonMethods } from '@/store/helpers'
import { OrderSearch } from '@/api/order'
import { SearchGlobalListValue } from '@/api/global_list'
import { GLOBAL_LIST_STATUS_ACTIVE, SHIPPING_STATUS } from '@/constants/global_list'
import { GetFlightSchedule } from '@/api/flight'
const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout
  },
  mixins: [TableEmptyText],
  name: 'Order',
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
        fromProvince: '',
        toProvince: '',
        flightScheduleId: '',
        orderId: '',
        awbCode: '',
        shippingStatus: ''
      },
      rules: {
        fromProvince: [
          { required: true, message: 'Từ Tỉnh/TP không được phép trống' }
        ],
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
        ],
        orderId: [
          { validator: validateOrderIdText, trigger: 'change' }
        ]
      },
      endOpen: false,
      listProvinces: [],
      listFlightSchedule: [],
      listShippingStatus: []
    }
  },
  created () {
    this.fetchShippingStatus()
    this.getProvinces()
  },
  mounted () {
    if (this.oldfillter) {
      this.filters = this.convertPropToSubmitDate(this.oldfillter)
      this.getData()
    }
  },
  computed: {
    ...authComputed,
    formValidate () {
      return {
        items: this.data
      }
    },
    oldfillter () {
      const fillter = window.localStorage.getItem('order.fillters')
      return JSON.parse(fillter)
    },
    listShippingStatusNotDup () {
      var seen = []
      var out = []
      var len = this.listShippingStatus.length
      for (var i = 0; i < len; i++) {
        var item = this.listShippingStatus[i]
        if (seen.filter(tmp => tmp.description === item.description).length === 0) {
          seen.push(item)
          out.push(item)
        }
      }
      return out
    }
  },
  methods: {
    ...commonMethods,
    changeFromProvince () {
      if (this.filters.toProvince !== null) {
        const params = {
          fromProvince: this.filters.fromProvince,
          toProvince: this.filters.toProvince
        }
        GetFlightSchedule(params).then(rs => {
          this.listFlightSchedule = rs
        })
      } else {
        this.listFlightSchedule = []
      }
    },
    changeToProvince (value) {
      if (this.filters.fromProvince !== null) {
        const params = {
          fromProvince: this.filters.fromProvince,
          toProvince: this.filters.toProvince
        }
        GetFlightSchedule(params).then(rs => {
          this.listFlightSchedule = rs
        })
      } else {
        this.listFlightSchedule = []
      }
    },
    getListFlightSchedule () {
      const params = {
        fromProvince: this.filters.fromProvince,
        toProvince: this.filters.toProvince
      }
      console.log(params)
      GetFlightSchedule(params).then(rs => {
        this.listFlightSchedule = rs
        console.log(rs)
      })
    },
    fetchShippingStatus () {
      SearchGlobalListValue({ globalListCode: SHIPPING_STATUS, status: GLOBAL_LIST_STATUS_ACTIVE })
        .then(rs => {
          this.listShippingStatus = rs
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
        })
    },
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.search()
    },
    getStepName (record) {
      const index = _.findIndex(this.listSteps, { id: record.step })
      if (index >= 0) {
        return this.listSteps[index].name
      }
      return ''
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
          this.getData()
        }
      })
    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize,
        fromProvince: this.currentUser.province
      }
      this.loading = true
      this.data = []
      OrderSearch(_.merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _.merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
        window.localStorage.setItem('order.fillters', JSON.stringify(this.filters))
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
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: record.orderId } })
    }

  }
}
</script>
