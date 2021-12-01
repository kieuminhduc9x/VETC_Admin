<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">GIAO VẬN ĐƠN CHO BIKE TẠI HUB CUỐI</a-breadcrumb-item>
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
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
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
                    disabled
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="currentUser.province"
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
                <a-form-model-item prop="flightCode" label="Mã chuyến bay">
                  <a-input v-model="filters.flightCode"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="orderId" label="Mã vận đơn">
                  <a-input v-model="filters.orderId"/>
                </a-form-model-item>

              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="awbCode" label="Mã AWB">
                  <a-input v-model="filters.awbCode"/>
                </a-form-model-item>

              </a-col>
              <a-col :xs="24" :md="8" :lg="4" class="filter-item-container">
                <a-form-model-item prop="shipperName" label="Bike giao">
                  <a-input v-model="filters.shipperName"/>
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

                    <span @click="onDetailRow(record)" style="padding-right:12px;cursor: pointer" class="vna-link">
                      Xem
                    </span>
                    <span @click="onHandleDelivery(record)" class="vna-link">
                      Giao
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
import { SearchOrderDeliveryForLastBike, DeliveryOrderToLastBike } from '@/api/order'
const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout
  },
  mixins: [TableEmptyText],
  name: 'BikeHubEndReceipt',
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
        flightCode: '',
        orderId: '',
        awbCode: '',
        shipperName: ''

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
        ],
        orderId: [
          { validator: validateOrderIdText, trigger: 'change' }
        ]
      },
      endOpen: false,
      selectedRowKeys: [],
      listProvinces: [],
      listToProvinces: []
    }
  },
  created () {
    this.getProvinces()
    this.getData()
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
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.search()
    },
    openNotification (e) {
      e.preventDefault()
      this.$notification.success({
        message: 'Giao hàng cho Bike tại Hub cuối',
        description:
            'Giao hàng cho Bike tại Hub cuối thành công',
        duration: 5
      })
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
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      SearchOrderDeliveryForLastBike(_.merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _.merge(this.pagination, this.handlePaginationData(res))
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
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: record.orderId }, query: { from: 'bikehubendreceipt' } })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onHandleDelivery (record) {
      this.$confirm({
        title: 'Bạn chắc chắn muốn giao cho bike?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.deliveryBike(record)
        },
        onCancel () {
        }
      })
    },
    deliveryBike (record) {
      DeliveryOrderToLastBike({ orderId: record.orderId })
        .then(rs => {
          this.$notification.success({
            message: 'Giao cho bike',
            description:
              'Giao cho bike thành công',
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
    }

  }
}
</script>
