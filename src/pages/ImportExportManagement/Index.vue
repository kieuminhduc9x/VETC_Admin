<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Quản lý nhập xuất</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-form-model
      ref="ruleFilter"
      :model="filters"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Điều kiện tìm kiếm" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="warehouseCode" label="Mã kho">
                  <a-input
                    v-model="filters.warehouseCode"
                  >
                  </a-input>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="billCode" label="Mã đơn hàng">
                  <a-input v-model="filters.billCode"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="fromDate" label="Ngày nhập từ ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    v-model="filters.fromDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="endDate" label="Đến ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    v-model="filters.endDate"/>
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
      <a-collapse-panel header="Kết quả trả về" key="1">
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
                class="ant-table-bordered"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="operation" >
                  <a-popover >
                    <template slot="content" >
                      <span>Sửa</span>
                    </template>
                    <a-icon type="edit" style="margin-right: 8px; color: #086885"></a-icon>
                  </a-popover>
                  <a-popover >
                    <template slot="content">
                      <span>Xóa</span>
                    </template>
                    <a-icon type="delete" style="margin-right: 8px; color: red"></a-icon>
                  </a-popover>
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
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import { searchImporteExportManagement } from '@/api/import-export-management'
import { commonMethods, authComputed } from '@/store/helpers'
import pdf from 'vue-pdf'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    pdf
  },
  mixins: [TableEmptyText],
  name: 'WarehouseManagement',
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
      loadingExport: false,
      filters: {
        warehouseCode: '',
        billCode: '',
        fromDate: '',
        endDate: ''
      },
      selectedRowKeys: []
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
      const params = {}
      this.loading = false
      this.data = []
      searchImporteExportManagement(params).then(res => {
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
