<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Nhận vận đơn tại Hub đầu</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :loading="loading"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm vận đơn" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item label="Từ Tỉnh/TP">
                  <a-select
                    disabled
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="currentUser.province"
                  >
                    <a-select-option

                      v-for="item in listProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="toProvince" label="Đến Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.toProvince"
                    @change="changeToProvince"
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
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="fligtScheduleId" label="Khung giờ bay">
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
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
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
                      class="vna-link"
                      style="padding-right:12px;cursor: pointer">
                      <span>Xem</span>
                    </span>

                    <span
                      @click="onConfirmReceipt(record)"
                      class="vna-link"
                      style="padding-right:12px;cursor: pointer">
                      <span>Nhận</span>
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
import { GetOrderSendToFirstHub, ConfirmReceiptOrderInFirstHub } from '@/api/order'
import { commonMethods, authComputed } from '@/store/helpers'

import _merge from 'lodash/merge'
import { GetFlightSchedule } from '../../api/flight'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout
  },
  mixins: [TableEmptyText],
  name: 'HubStart',
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
        toProvince: '',
        flightScheduleId: '',
        orderId: ''
      },
      rules: {
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
        ],
        orderId: [
          { validator: validateOrderIdText, trigger: 'change' }
        ]
      },
      endOpen: false,
      listProvinces: [],
      listToProvinces: [],
      listFlightSchedule: [],
      visible: false,
      confirmLoading: false

    }
  },
  created () {
    this.$router.push({ name: 'look_up_order' })
    this.getProvinces()
  },
  mounted () {
    if (this.oldfillter) {
      this.filters = this.convertPropToSubmitDate(this.oldfillter)
      this.getData()
      this.changeToProvince(this.filters.toProvince)
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
      const fillter = window.localStorage.getItem('hubstart.fillters')
      return JSON.parse(fillter)
    }
  },
  methods: {
    ...commonMethods,
    changeToProvince (value) {
      if (this.currentUser.province !== null) {
        const params = {
          fromProvince: this.currentUser.province,
          toProvince: this.filters.toProvince
        }
        GetFlightSchedule(params).then(rs => {
          this.listFlightSchedule = rs
        })
      } else {
        this.listFlightSchedule = []
      }
    },
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: record.orderId }, query: { from: 'hubstart' } })
    },
    onAcceptOrder (record) {
      this.visible = true
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
    onConfirmReceipt (record) {
      this.$confirm({
        title: 'Bạn chắc chắn muốn nhận mã vận đơn: ' + record.orderId + '?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.confirmReceipt(record)
        },
        onCancel () {
        }
      })
    },
    confirmReceipt (record) {
      this.loading = true
      ConfirmReceiptOrderInFirstHub({ orderId: record.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Nhận vận đơn',
            description:
              'Nhận vận đơn thành công',
            duration: 5
          })
          this.getData()
        })
        .catch(err => {
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
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      GetOrderSendToFirstHub(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
        window.localStorage.setItem('hubstart.fillters', JSON.stringify(this.filters))
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
    handleSearch (value) {
      this.listToProvinces = this.listProvinces.filter(item => this.slugify(item.provinceName.toLowerCase(), ' ').indexOf(this.slugify(value.toLowerCase()), ' ') !== -1)
    }

  }
}
</script>
