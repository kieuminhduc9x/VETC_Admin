<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Quản lý danh sách máy đọc mã vạch </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh sách máy đọc mã vạch" key="1">
        <a-row :gutter="16">
          <a-col :xs="24" :md="10" :lg="10" :offset="1">
            <a-form-model :model="filter" ref="ruleFilter">
              <a-form-model-item
                label="Chọn kho"
                prop="warehouseId"
                :rules="[]">
                <a-select
                  v-model="filter.warehouseId"
                  :allowClear="true"
                  show-search
                  @change="changeWarehouse"
                  :filter-select-option="filterSelectOption">
                  <a-select-option :key="''" :value="''">--Tất cả--</a-select-option>
                  <a-select-option v-for="item in listWarehouse" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-form-model>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="24" :lg="24">
            <div style="display: flex; justify-content: flex-end">
              <a-button
                :loading="loading"
                type="primary"
                class="btn-success uppercase"
                style="margin-left: 10px; margin-top: 20px"
                @click="showCreate">Thêm mới
              </a-button>
            </div>
          </a-col>
        </a-row>
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
                <template slot="operation" slot-scope="text, record">
                  <a-popover >
                    <template slot="content">
                      <span>Sửa</span>
                    </template>
                    <a-icon @click="showUpdate(record)" type="edit" style="margin-right: 8px; color: #086885"></a-icon>
                  </a-popover>
                  <a-popover >
                    <template slot="content">
                      <span>Xóa</span>
                    </template>
                    <a-icon type="delete" @click="onDeleteRow(record)" style="margin-right: 8px; color: red"></a-icon>
                  </a-popover>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <form-warehouse
      v-if="visibleForm === true"
      :visibleForm="visibleForm"
      :isCreate="isCreate"
      :isUpdate="isUpdate"
      :modelObject="modelObject"
      @closeForm="closeForm"
    ></form-warehouse>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import { deleteBarcodeReadersManagement, searchBarcodeReadersManagement } from '@/api/barcode-readers-management'
import { commonMethods, authComputed } from '@/store/helpers'
import pdf from 'vue-pdf'
import FormWarehouse from './Form'
import _ from 'lodash'
import { searchWarehouseManagement } from '@/api/warehouse-management'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    pdf,
    FormWarehouse
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
      visibleForm: false,
      isCreate: false,
      isUpdate: false,
      modelObject: {
        id: '',
        warehouseCode: '',
        phone: '',
        imei: ''
      },
      filter: {
        warehouseId: ''
      },
      listWarehouse: []
    }
  },
  async created () {
    await this.getListWarehouse('')
    await this.getData('')
  },
  mounted () {
    this.scrollBarOfTable()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...commonMethods,
    changeWarehouse (value) {
      if (value) {
        this.getData(value)
      }
    },
    getListWarehouse (value) {
      this.loading = true
      const params = {
        pagination: false
      }
      searchWarehouseManagement(params).then(res => {
        this.listWarehouse = res.data
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
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    getData (value) {
      const params = {
        warehouseId: value
      }
      this.loading = false
      this.data = []
      searchBarcodeReadersManagement(params).then(res => {
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
    showCreate () {
      this.visibleForm = true
      this.isCreate = true
      this.isUpdate = false
    },
    showUpdate (record) {
      this.visibleForm = true
      this.isCreate = false
      this.isUpdate = true
      this.modelObject = _.cloneDeep(record)
    },
    closeForm () {
      this.visibleForm = false
      this.modelObject = {}
      this.getData()
    },
    onDeleteRow (record) {
      this.$confirm({
        title: 'Bạn muốn xóa bản ghinày?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (record.id) {
            this.deleteGL(record.id)
          }
        },
        onCancel () {
        }
      })
    },
    deleteGL (id) {
      const $this = this
      this.loading = true
      deleteBarcodeReadersManagement({ id: id })
        .then(rs => {
          $this.getData()
          this.$success({
            message: 'Quản lý nhà kho',
            description: 'Xóa nhà kho thành công',
            duration: 5
          })
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
