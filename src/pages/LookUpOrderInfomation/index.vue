<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tất cả đơn hàng</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm thông tin đơn hàng" key="1">
          <a-card style="width: 100%;border: none" class="search-container" >
            <a-row :gutter="16">
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
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
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="toProvince" label="Đến Tỉnh/TP">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
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
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="hrvSupplierId" label="Nhà bán hàng">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.hrvSupplierId"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --</a-select-option>
                    <a-select-option
                      v-for="item in listSupplier"
                      :key="'t-p-' + item.hrvSupplierId"
                      :value="item.hrvSupplierId">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="transportCompanyId" label="Đối tác vận chuyển">
                  <a-select
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.transportCompanyId"
                  >
                    <a-select-option :value="''" default-value="" :key="'all'">-- Tất cả --
                    </a-select-option>
                    <a-select-option
                      v-for="item in listTransportCompany"
                      :key="'t-p-' + item.transportCompanyId"
                      :value="item.transportCompanyId">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="orderStatus" label="Trạng thái đơn hàng">
                  <a-select
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.orderStatus"
                  >
                    <a-select-option
                      v-for="item in listOrderStatus"
                      :key="'p-g-' + item.value"
                      :value="item.value">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="timeSend" label="Ngày giao hàng">
                  <a-range-picker
                    style="width: 100%"
                    v-model="filters.timeSend"
                    :format="'DD/MM/YYYY'"
                  >
                  </a-range-picker>
                </a-form-model-item>

              </a-col>
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="searchBy"
                  label="Tìm theo"
                  :rules="[
                    {
                      required: true,
                      message:'Tìm theo bắt buộc chọn',
                      trigger: 'change'
                    }
                  ]">
                  <a-select
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="filters.searchBy"
                  >
                    <a-select-option
                      v-for="item in listSearchBy"
                      :key="'p-g-' + item.value"
                      :value="item.value">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item prop="keyword" label="Từ khóa">
                  <a-input v-model="filters.keyword"/>
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
      <a-collapse-panel header="Danh sách thông tin đơn hàng" key="1">
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
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="vnaMallOrderNumber" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.vnaMallOrderNumber }}</span>
                    </template>
                    <span> {{ record.vnaMallOrderNumber }}</span>
                  </a-tooltip>
                </template>
                <template slot="sendAddress" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.sendAddress }}</span>
                    </template>
                    <span> {{ record.sendAddress }}</span>
                  </a-tooltip>
                </template>
                <template slot="receiveAddress" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.receiveAddress }}</span>
                    </template>
                    <span> {{ record.receiveAddress }}</span>
                  </a-tooltip>
                </template>
                <template slot="receiverName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.receiverName }}</span>
                    </template>
                    <span> {{ record.receiverName }}</span>
                  </a-tooltip>
                </template>
                <template slot="transportCompanyName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.transportCompanyName }}</span>
                    </template>
                    <span> {{ record.transportCompanyName }}</span>
                  </a-tooltip>
                </template>
                <template slot="shipperInfo" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.shipperInfo }}</span>
                    </template>
                    <span> {{ record.shipperInfo }}</span>
                  </a-tooltip>
                </template>
                <template slot="hrvSupplierName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.hrvSupplierName }}</span>
                    </template>
                    <span> {{ record.hrvSupplierName }}</span>
                  </a-tooltip>
                </template>
                <template slot="orderStatusName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span> {{ record.orderStatusName }}</span>
                    </template>
                    <span style="font-weight: bold" :class="record.orderStatus === '5' ? 'color-red' : record.orderStatus === '4' ? 'color-green' : record.orderStatus === '3' ? 'color-blue' : 'color-yellow'"> {{ record.orderStatusName }}</span>
                  </a-tooltip>
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
import { searchOrderInformation, getListSupplier, getListTransportCompany } from '@/api/order'
import { SearchGlobalListValue } from '@/api/global_list'
import { ORDER_STATUS } from '@/constants/global_list'
import moment from 'moment'
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
        hrvSupplierId: '',
        transportCompanyId: '',
        keyword: '',
        orderStatus: '',
        timeSend: [],
        searchBy: '0'
      },
      listSearchBy: [
        {
          value: '0',
          name: 'Mã đơn hàng'
        },
        {
          value: '1',
          name: 'Số điện thoại người nhận'
        },
        {
          value: '2',
          name: 'Mã đơn hàng VNA Mall'
        },
        {
          value: '3',
          name: 'Số điện thoại tài xế'
        },
        {
          value: '4',
          name: 'Mã đơn vận đối tác'
        }
      ],
      listSupplier: [],
      listTransportCompany: [],
      rules: {
        // fromProvince: [
        //   { required: true, message: 'Từ Tỉnh/TP không được phép trống' }
        // ],
        // toProvince: [
        //   { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
        // ]
      },
      listProvinces: [],
      listToProvinces: [],
      listOrderStatus: []
    }
  },
  created () {
    this.fetchOrderStatus()
    this.getProvinces()
    this.getListSupplier()
    this.getListTransportCompany()
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
      const fillter = window.localStorage.getItem('orderInfo.filters')
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
    moment,
    getListSupplier () {
      getListSupplier({}).then(rs => {
        this.listSupplier = rs
      })
    },
    getListTransportCompany () {
      getListTransportCompany({}).then(rs => {
        this.listTransportCompany = rs
      })
    },
    fetchOrderStatus () {
      SearchGlobalListValue({ globalListCode: ORDER_STATUS })
        .then(rs => {
          this.listOrderStatus = rs
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
        if (valid) {
          this.pagination.current = 1
          this.getData()
        }
      })
    },
    getData () {
      if (this.filters.timeSend.length > 0) {
        this.filters.timeSend = this.filters.timeSend.map(item => moment(item, 'YYYY-MM-DD').format('YYYY-MM-DD'))
      }
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize,
        toProvince: this.filters.toProvince,
        hrvSupplierId: this.filters.hrvSupplierId,
        transportCompanyId: this.filters.transportCompanyId,
        keyword: this.filters.keyword,
        fromTimeSend: this.filters.timeSend.length > 0 ? this.filters.timeSend[0] : '',
        toTimeSend: this.filters.timeSend.length > 0 ? this.filters.timeSend[1] : '',
        fromProvince: this.currentUser.province || this.filters.fromProvince,
        searchBy: this.filters.searchBy,
        orderStatus: this.filters.orderStatus,
        listHrvWarehouseId: JSON.parse(window.localStorage.getItem('store_id'))
      }
      this.loading = true
      this.data = []
      searchOrderInformation(params).then(res => {
        if (res) {
          this.data = this.convertPropToDisplayDate(res.data)
          this.pagination = _.merge(this.pagination, this.handlePaginationData(res))
          this.loading = false
          window.localStorage.setItem('orderInfo.filters', JSON.stringify(this.filters))
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
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: record.orderId } })
    }

  }
}
</script>
<style>
.color-red {
  color: red!important;
}
.color-green {
  color: #22c993!important;
}
.color-blue {
  color: #36a3f7!important;
}
.color-yellow {
  color: #fdbd41!important;
}
</style>
