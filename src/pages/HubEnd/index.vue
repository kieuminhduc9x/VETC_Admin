<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Nhận AWB tại Hub cuối</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm vận đơn hàng không AWB" key="1">
          <a-card style="width: 100%;border: none" class="search-container" >
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="fromProvince" label="Từ Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.fromProvince"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>

                    <a-select-option
                      v-for="item in listFromProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="toProvince" label="Đến Tỉnh/TP">
                  <a-select
                    disabled
                    v-model="currentUser.province"
                    :allowClear="true"
                    show-search
                    :filter-option="false"
                    @search="handleSearchTo"
                    style="width: 100%"
                  >
                    <a-select-option
                      v-for="item in listToProvinces"
                      :key="'p-g-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="flightCode" label="Mã chuyến bay">
                  <a-input v-model="filters.flightCode"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="awbCode" label="Mã AWB">
                  <a-input v-model="filters.awbCode"/>
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
      <a-collapse-panel header="Danh sách vận đơn hàng không" key="1">
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
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
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
                      @click="onConfirmReceipt(record)"
                      class="vna-link"
                      style="padding-right:12px;cursor: pointer">
                      <span>Nhận</span>
                    </span>
                  </div>
                </template>
                <AwbOrderTable slot="expandedRowRender" slot-scope="text" v-if="text.orderMergeId" :data-source="text" :show-shipper="false"></AwbOrderTable>

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
import { authComputed, commonMethods } from '@/store/helpers'
import _merge from 'lodash/merge'
import {
  ConfirmReceiptOrderMergeInLastHub,
  GetListOrderMergeSendToLastHub
} from '@/api/order'
import AwbOrderTable from './../GroupAWB/_AWBOrderTable'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    AwbOrderTable
  },
  mixins: [TableEmptyText],
  name: 'HubEnd',
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    const validateFlightCodeInput = (rule, value, callback) => {
      const numbersOnly = /^[A-Za-z0-9]+$/
      if (value && !(numbersOnly.test(value))) {
        callback(new Error('Mã chuyến bay không hợp lệ'))
      } else {
        this.$refs.ruleForm.validateField('flightCode')
        callback()
      }
    }
    const validateAWBCodeInput = (rule, value, callback) => {
      const numbersOnly = /^[A-Za-z0-9]+$/
      if (value && !(numbersOnly.test(value))) {
        callback(new Error('Mã AWB không hợp lệ'))
      } else {
        this.$refs.ruleForm.validateField('awbCode')
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
        flightCode: '',
        awbCode: ''
      },
      rules: {
        fromProvince: [
          { required: true, message: 'Từ Tỉnh/TP không được phép trống' }
        ],
        flightCode: [
          { validator: validateFlightCodeInput, trigger: 'change' }
        ],
        awbCode: [
          { validator: validateAWBCodeInput, trigger: 'change' }
        ]
      },
      endOpen: false,
      listProvinces: [],
      listFromProvinces: [],
      listToProvinces: []
    }
  },
  created () {
    this.getProvinces()
  },
  computed: {
    ...authComputed,
    formValidate () {
      return {
        items: this.data
      }
    }
  },
  methods: {
    ...commonMethods,
    getProvinces () {
      this.fetchProvince({ size: 1000 }).then(res => {
        this.listProvinces = res
        this.listToProvinces = res
        this.listFromProvinces = res
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
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: 1 }, query: { from: 'hubend' } })
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
        if (valid) {
          this.pagination.current = 1
          this.getData()
        }
      })
    },
    onConfirmReceipt (record) {
      this.$confirm({
        title: 'Bạn chắc chắn muốn nhận mã AWB: ' + record.awbCode + '?',
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
      ConfirmReceiptOrderMergeInLastHub({ orderMergeId: record.orderMergeId })
        .then(rs => {
          this.$notification.success({
            message: 'Nhận vận đơn hàng không',
            description:
              'Nhận vận đơn hàng không thành công',
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
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      GetListOrderMergeSendToLastHub(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
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
    }

  }
}
</script>
