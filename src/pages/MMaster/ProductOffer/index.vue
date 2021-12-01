<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Danh mục giá vận đơn hàng không</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm Giá vận đơn hàng không" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item label="Từ Tỉnh/TP" prop="fromProvince">
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
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
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
                      v-for="item in listProvinces"
                      :key="'t-p-' + item.provinceCode"
                      :value="item.provinceCode">{{ item.provinceName }}
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
      <a-collapse-panel header="Danh mục giá vận đơn hàng không" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>

            <a-col :span="24" class="cus-flex-end">
              <a-button
                class="ant-btn ant-btn-primary"
                :style="{marginLeft: '8px'}"
                @click="addNew"
              >
                Thêm
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
                class="ant-table-bordered">
                <template slot="actionTitle">
                  <a-icon type="control" :style="{fontSize: '14px'}"/>
                </template>
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="fromTime" slot-scope="text, record">
                  <span v-if="record.fromTime">{{ record.fromTime + '-' + record.toTime }} </span>
                </template>
                <template slot="status" slot-scope="text, record">
                  <a-switch checked-children="Hiệu lực" un-checked-children="Hết hiệu lực" :checked="record.status" @change="changeStatus(record)"/>

                </template>
                <template slot="operation" slot-scope="text, record">
                  <div>
                    <span @click="onEditRow(record)" class="vna-link">Sửa</span>

                    <span
                      @click="onDeleteRow(record)"
                      class="vna-link"
                      style="padding-left:12px;cursor: pointer">
                      Xóa
                    </span>
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-modal
      :title="modalTitle"
      :visible="modalSync"
      :maskClosable="false"
      :footer="null"
      width="50%"
      @cancel="handleCancelModal"
    >
      <model-form
        v-if="modalSync"
        :is-editable="modalIsEdit"
        :is-view="false"
        :is-create="modalIsCreate"
        @closeModal="handleCancelModal"
        :objectEdit="objectEdit"></model-form>

    </a-modal>

  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import Form from './Form'
import { commonMethods, authComputed } from '@/store/helpers'
import { ProductOfferDelete, ProductOfferSearch, ProductOfferUpdateStatus } from '@/api/product_offer'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    ModelForm: Form
  },
  mixins: [TableEmptyText],
  name: 'MasterFlight',
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
      modalTitle: 'Thêm mới Hub',
      modalSync: false,
      modalIsEdit: false,
      modalIsCreate: false,
      objectEdit: {},
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
        toProvince: ''
      },
      rules: {},
      endOpen: false,
      visible: false,
      listProvinces: []
    }
  },
  created () {
    this.getProvinces()
  },
  mounted () {
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
      })
    },
    handleCancelModal (reload = false) {
      this.modalSync = false
      if (reload) {
        this.getData()
      }
    },
    resetForm (e) {
      this.$refs.ruleForm.resetFields()
      this.search(e)
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
    reloadData () {

    },

    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    search () {
      this.$refs.ruleForm.validate(valid => {
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
      ProductOfferSearch(_merge(params, this.filters)).then(res => {
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
    addNew () {
      this.modalTitle = 'Thêm mới giá vận đơn hàng không'
      this.modalIsCreate = true
      this.modalIsEdit = false
      this.modalSync = true
    },
    onEditRow (record) {
      this.objectEdit = record
      this.modalTitle = 'Cập nhật giá vận đơn hàng không'
      this.modalIsCreate = false
      this.modalIsEdit = true
      this.modalSync = true
    },
    onDeleteRow (record, index) {
      this.$confirm({
        title: 'Bạn có muốn xóa giá vận đơn hàng không này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.deleteRow(record.productOfferId)
        },
        onCancel () {
        }
      })
    },
    deleteRow (id) {
      const $this = this
      this.loading = true
      ProductOfferDelete({ productOfferId: id })
        .then(rs => {
          this.$notification.success({
            message: 'Xóa giá vận đơn hàng không',
            description:
                'Xóa giá vận đơn hàng không thành công',
            duration: 5
          })
          $this.getData()
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
    changeStatus (record) {
      this.loading = true
      ProductOfferUpdateStatus({ productOfferId: record.productOfferId, status: record.status ? 0 : 1 })
        .then(rs => {
          record.status = !record.status
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
