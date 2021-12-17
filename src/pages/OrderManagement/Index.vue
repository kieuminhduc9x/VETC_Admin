<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Quản lý đơn đặt hàng</a-breadcrumb-item>
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
                <a-form-model :model="filters" ref="ruleFilter">
                  <a-form-model-item
                    label="Trạng thái"
                    prop="status"
                    :rules="[]">
                    <a-select
                      v-model="filters.status"
                      :allowClear="true"
                      show-search
                      :filter-select-option="filterSelectOption">
                      <a-select-option :key="''" :value="''">--Tất cả--</a-select-option>
                      <a-select-option v-for="item in listStatus" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-form-model>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="fromDate" label="Từ ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    @change="changeFromDate"
                    v-model="filters.fromDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="toDate" label="Đến ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    :disabled-date="disabledToDate"
                    v-model="filters.toDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="keyword" label="Từ khóa">
                  <a-input v-model="filters.keyword"></a-input>
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
                :columns="columns"
                :data-source="data"
                :rowKey=" (rowKey, index ) => index"
                :pagination="data.length === 0 ? false : pagination"
                :loading="loading"
                :scroll="{ x: '100%' }"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="actionTitle" >
                  <a-icon type="control"></a-icon>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <a-popover >
                    <template slot="content" >
                      <span>Chi tiết</span>
                    </template>
                    <a-icon type="eye" @click="goToDetail(record)" style=" color: #086885"></a-icon>
                  </a-popover>
                </template>
                <a-table
                  slot="expandedRowRender"
                  slot-scope="text, record"
                  :columns="columnsChild"
                  :data-source="record.listChild"
                  :pagination="false"
                >
                </a-table>
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
import { searchPreOrder } from '@/api/pre-order'
import { commonMethods, authComputed } from '@/store/helpers'
import pdf from 'vue-pdf'
import columnsChild from './columnChild'
import moment from 'moment'

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
      moment,
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
      columnsChild,
      loadingExport: false,
      filters: {
        status: '',
        fromDate: '',
        toDate: '',
        keyword: ''
      },
      listStatus: []
    }
  },
  created () {
    this.getListStatus()
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
    changeFromDate (value) {
      if (value) {
        this.filters.toDate = ''
      }
    },
    disabledToDate (toDate) {
      const fromDate = this.filters.fromDate
      if (!toDate || !fromDate) {
        return false
      }
      return fromDate.valueOf() >= toDate.valueOf()
    },
    getListStatus () {
      this.listStatus = []
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
      const params = {
        page: this.pagination.current > 0 ? this.pagination.current - 1 : 0,
        size: this.pagination.pageSize,
        status: this.filters.status,
        keyword: this.filters.keyword,
        fromDate: this.filters.fromDate !== '' ? moment(this.filters.fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '',
        toDate: this.filters.toDate !== '' ? moment(this.filters.toDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : ''
      }
      this.loading = true
      this.data = []
      searchPreOrder(params).then(res => {
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
    },
    goToDetail (record) {
      this.$router.push({ name: 'order_management.detail', params: { id: record.id } })
    }

  }
}
</script>
