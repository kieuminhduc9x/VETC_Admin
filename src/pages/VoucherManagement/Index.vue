<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Nhập xuất hàng</a-breadcrumb-item>
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
              <a-col :xs="24" :md="4" :lg="4" class="filter-item-container">
                <a-form-model-item
                  label="Chọn kho"
                  prop="warehouseId"
                  :rules="[]">
                  <a-select
                    v-model="filters.warehouseId"
                    :allowClear="true"
                    :disabled="disabledWarehouse"
                    show-search
                    :filter-select-option="filterSelectOption">
                    <a-select-option :key="''" :value="''">--Tất cả--</a-select-option>
                    <a-select-option v-for="item in listWarehouse" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="4" :lg="4" class="filter-item-container">
                <a-form-model-item prop="preOrderNo" label="Mã đơn hàng">
                  <a-input v-model="filters.preOrderNo"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="4" :lg="4" class="filter-item-container">
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
              </a-col>
              <a-col :xs="24" :md="3" :lg="3" class="filter-item-container">
                <a-form-model-item prop="importFromDate" label="Ngày nhập từ ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    @change="changeImportFromDate"
                    v-model="filters.importFromDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="3" :lg="3" class="filter-item-container">
                <a-form-model-item prop="importToDate" label="Đến ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    :disabled-date="disabledImportToDate"
                    v-model="filters.importToDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="3" :lg="3" class="filter-item-container">
                <a-form-model-item prop="exportFromDate" label="Ngày xuất từ ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    @change="changeExportFromDate"
                    v-model="filters.exportFromDate"/>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="3" :lg="3" class="filter-item-container">
                <a-form-model-item prop="exportToDate" label="Đến ngày">
                  <a-date-picker
                    placeholder="DD/MM/YYYY"
                    :format="'DD/MM/YYYY'"
                    :disabled-date="disabledExportToDate"
                    v-model="filters.exportToDate"/>
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
                <a-button v-if="$auth.hasPrivilege('VOUCHER_MANAGEMENT_SEARCH')" type="primary" class="btn-success uppercase" @click="search">Tìm kiếm
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
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
                <template slot="warehouseName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.warehouseName }}</span>
                    </template>
                    <span>{{ record.warehouseName }}</span>
                  </a-tooltip>
                </template>
                <template slot="voucherCode" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.voucherCode }}</span>
                    </template>
                    <span>{{ record.voucherCode }}</span>
                  </a-tooltip>
                </template>
                <template slot="importAt" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.importAt }}</span>
                    </template>
                    <span>{{ record.importAt }}</span>
                  </a-tooltip>
                </template>
                <template slot="exportAt" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.exportAt }}</span>
                    </template>
                    <span>{{ record.exportAt }}</span>
                  </a-tooltip>
                </template>
                <template slot="preOrderNo" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.preOrderNo }}</span>
                    </template>
                    <span>{{ record.preOrderNo }}</span>
                  </a-tooltip>
                </template>
                <template slot="receiveAddress" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.receiveAddress }}</span>
                    </template>
                    <span>{{ record.receiveAddress }}</span>
                  </a-tooltip>
                </template>
                <template slot="statusName" slot-scope="text, record">
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>{{ record.statusName }}</span>
                    </template>
                    <span>{{ record.statusName }}</span>
                  </a-tooltip>
                </template>
                <template slot="actionTitle" >
                  <a-icon type="control"></a-icon>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <a-popover >
                    <template slot="content" >
                      <span>Chi tiết</span>
                    </template>
                    <a-icon v-if="$auth.hasPrivilege('VOUCHER_MANAGEMENT_DETAIL')" type="eye" @click="goToDetail(record)" style=" color: #086885"></a-icon>
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
import { searchImportExportManagement } from '@/api/import-export-management'
import { commonMethods, authComputed } from '@/store/helpers'
import pdf from 'vue-pdf'
import moment from 'moment'
import { GetStoreForUser } from '@/api/user'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    pdf
  },
  mixins: [TableEmptyText],
  name: 'ImportExportManagement',
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
      loadingExport: false,
      filters: {
        warehouseId: '',
        preOrderNo: '',
        importFromDate: '',
        importToDate: '',
        exportFromDate: '',
        exportToDate: '',
        status: ''
      },
      listWarehouse: [],
      disabledWarehouse: false,
      store: JSON.parse(window.localStorage.getItem('store')),
      listStatus: [
        {
          value: '1',
          name: 'Đã nhập'
        },
        {
          value: '2',
          name: 'Đã xuất'
        },
        {
          value: '3',
          name: 'Giao hàng thành công'
        }
      ]
    }
  },
  created () {
    this.getListWarehouse()
    this.getData()
  },
  mounted () {
    this.scrollBarOfTable()
    console.log(this.store)
    if (this.store !== 'All') {
      this.filters.warehouseId = this.store.id
      this.disabledWarehouse = true
    } else {
      this.getListWarehouse()
      this.disabledWarehouse = false
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    changeImportFromDate (value) {
      if (value) {
        this.filters.importToDate = ''
      }
    },
    disabledImportToDate (toDate) {
      const fromDate = this.filters.importFromDate
      if (!toDate || !fromDate) {
        return false
      }
      return fromDate.valueOf() >= toDate.valueOf()
    },
    changeExportFromDate (value) {
      if (value) {
        this.filters.exportToDate = ''
      }
    },
    disabledExportToDate (toDate) {
      const fromDate = this.filters.exportFromDate
      if (!toDate || !fromDate) {
        return false
      }
      return fromDate.valueOf() >= toDate.valueOf()
    },
    getListWarehouse (value) {
      this.loading = true
      const params = {
        pagination: false
      }
      GetStoreForUser(params).then(res => {
        this.listWarehouse = res
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
        warehouseId: this.filters.warehouseId,
        preOrderNo: this.filters.preOrderNo,
        importFromDate: this.filters.importFromDate !== '' ? moment(this.filters.importFromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '',
        importToDate: this.filters.importToDate !== '' ? moment(this.filters.importToDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '',
        exportFromDate: this.filters.exportFromDate !== '' ? moment(this.filters.exportFromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '',
        exportToDate: this.filters.exportToDate !== '' ? moment(this.filters.exportToDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '',
        status: this.filters.status
      }
      this.loading = true
      this.data = []
      searchImportExportManagement(params).then(res => {
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
      this.$router.push({ name: 'voucher_management.detail', params: { id: record.id } })
    }

  }
}
</script>
<style lang="less">
.ant-select-selection-selected-value{
  color: black;
}
</style>
