<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Chuyển AWB tại sân bay đầu</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm vận đơn hàng không" key="1">
          <a-card style="width: 100%;border: none" class="search-container" >
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
                <a-form-model-item label="Từ Tỉnh/TP">
                  <a-select
                    disabled
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="currentUser.province"
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
                <a-form-model-item prop="flightCode" label="Mã chuyến bay">
                  <a-input v-model="filters.flightCode"/>
                </a-form-model-item>
              </a-col>

              <a-col :xs="24" :md="8" :lg="6" class="filter-item-container">
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
                  <div v-if="record.status === statusWait">
                    <span
                      @click="onReceivedAwb(record)"
                      class="vna-link">
                      <span>Nhận</span>
                    </span>
                  </div>
                  <div v-if="record.status === statusDone">
                    <span
                      @click="showEditForm(record)"
                      class="vna-link"
                      style="padding-right: 12px">
                      <span>Sửa</span>
                    </span>
                    <span
                      @click="onHandleFlight(record)"
                      class="vna-link">
                      <span>Chuyển</span>
                    </span>
                  </div>
                </template>
                <AwbOrderTable
                  slot="expandedRowRender"
                  :show-action="text.status === statusDone"
                  slot-scope="text"
                  v-if="text.orderMergeId"
                  :data-source="text"
                  @removeOrderDone="removeOrderDone"
                  :show-shipper="false"></AwbOrderTable>

              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-modal
      :destroyOnClose="true"
      :maskClosable="false"
      title="Cập nhật AWB tại sân bay"
      :visible="showFormUpdateAWB"
      :footer="null"
      width="50%"
      @cancel="handleCancelUpdate"
    >
      <FormUpdateAwb
        :awb-obj="groupAWBObj"
        @closePopup="showFormUpdateAWB = false"
        @closePopupReload="handleUpdateAwbDone"
        v-if="showFormUpdateAWB"/>
    </a-modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../utils/table-empty-text'
import columns from './columns'
import { commonMethods, authComputed } from '@/store/helpers'
import _merge from 'lodash/merge'
import { GetOrderMergeNotYetTransferPlane, TransferToPlane, ReceiveAtFirstAirport } from '@/api/order'
import AwbOrderTable from './../GroupAWB/_AWBOrderTable'
import FormUpdateAwb from './FormUpdateAwb'
import _findIndex from 'lodash/findIndex'
const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    AwbOrderTable,
    FormUpdateAwb
  },
  mixins: [TableEmptyText],
  name: 'GroupAWB',
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
      showFormUpdateAWB: false,
      activeSearchKey: 1,
      activeResultKey: 1,
      data: [],
      selectedRowKeys: [],
      expandedRowKeys: [],
      groupAWBObj: {
        fromProvince: {},
        toProvince: {},
        listOrder: [],
        flightTimeFrame: ''
      },
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
        flightCode: '',
        awbCode: ''
      },
      rules: {
        toProvince: [
          { required: true, message: 'Đến Tỉnh/TP không được phép trống' }
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
      listToProvinces: [],
      statusWait: '1',
      statusDone: '5'
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
      })
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
      this.$router.push({ name: 'order_detail', params: { id: 1 }, query: { from: 'awbflight' } })
    },
    openNotification (e) {
      e.preventDefault()
      this.$notification.success({
        message: 'Chuyển tàu bay',
        description:
            'Chuyển tàu bay thành công',
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
      GetOrderMergeNotYetTransferPlane(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
      }).finally(res => {
        this.loading = false
      })
    },
    groupAwb () {
      this.$notification.success({
        message: 'Gộp vận đơn',
        description:
            'Gộp vận đơn thành công',
        duration: 5
      })
      this.selectedRowKeys = []
    },
    onHandleFlight (record) {
      this.$confirm({
        title: 'Bạn chắc chắn muốn chuyển AWB ra tàu bay?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.moveFlight(record)
        },
        onCancel () {
        }
      })
    },

    onReceivedAwb (record) {
      this.$confirm({
        title: 'Bạn chắc chắn muốn nhận AWB?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.handleReceiveAtFirstAirport(record)
        },
        onCancel () {
        }
      })
    },
    handleReceiveAtFirstAirport (record) {
      const params = {
        orderMergeId: record.orderMergeId
      }
      this.loading = true
      ReceiveAtFirstAirport(params).then(res => {
        this.loading = false
        this.$notification.success({
          message: 'Nhận AWB tại sân bay đầu',
          description:
              'Nhận AWB tại sân bay đầu thành công',
          duration: 5
        })
        this.getData()
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
    moveFlight (record) {
      TransferToPlane({ orderMergeId: record.orderMergeId })
        .then(rs => {
          this.$notification.success({
            message: 'Chuyển AWB ra tàu bay',
            description:
              'Chuyển AWB ra tàu bay thành công',
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
    handleCancelUpdate () {
      this.showFormUpdateAWB = false
    },
    handleUpdateAwbDone () {
      this.getData()
      this.showFormUpdateAWB = false
    },
    showEditForm (orderMerge) {
      this.groupAWBObj.orderMergeId = orderMerge.orderMergeId
      this.groupAWBObj.fromProvince = orderMerge.fromProvince
      this.groupAWBObj.fromProvinceName = orderMerge.fromProvinceName
      this.groupAWBObj.toProvince = orderMerge.toProvince
      this.groupAWBObj.toProvinceName = orderMerge.toProvinceName
      this.groupAWBObj.awbCode = orderMerge.awbCode
      this.showFormUpdateAWB = true
    },
    removeOrderDone (payload) {
      const index = _findIndex(this.data, payload)
      if (index >= 0) {
        const orderMerge = this.data[index]
        this.showEditForm(orderMerge)
      }
    }

  }
}
</script>
