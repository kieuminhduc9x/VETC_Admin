<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Danh mục dùng chung</a-breadcrumb-item>
      </a-breadcrumb>
      <!--        <a-select v-model="globalType" style="max-width: 200px;">-->
      <!--          <a-select-option v-for="(item, index) in globalListType" :value="item.id" :key="index + 'globalType' + item.id">-->
      <!--            {{ item.name }}-->
      <!--          </a-select-option>-->
      <!--        </a-select>-->
    </template>

    <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel header="Điều kiện tìm kiếm" key="1">
        <a-card style="width: 100%;border: none" class="search-container" >
          <a-row :gutter="16">
            <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
              <span class="i-title">Từ khóa</span>
              <a-input v-model="filters.keyword"/>
            </a-col>
            <a-col
              :xs="24"
              :md="10"
              :lg="10"
              class="filter-item-container"
              style="display: flex;flex-wrap: wrap; margin-top: 17px">
              <a-button type="primary" class="btn-success uppercase" style="margin-right: 1rem" @click="search">Tìm kiếm
              </a-button>
              <a-button class="btn-reset uppercase" @click="resetFilter">Nhập lại</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Kết quả tìm kiếm" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>
            <a-col :span="12">
            </a-col>
            <a-col :span="12" class="btn-container">
              <a-button class="ant-btn ant-btn-primary" @click="addRow"> <a-icon type="plus-circle"/> Thêm mới </a-button>
            </a-col>
          </a-row>
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1">
                <div class="div1"></div>
              </div>
              <a-form-model ref="formValidate" :model="formValidate">
                <a-table
                  ref="tb1"
                  @expand="expandRow"
                  :expandedRowKeys="expandedRowKeys"
                  :columns="columns"
                  :data-source="data"
                  :rowKey="rowKey"
                  :pagination="data.length === 0 ? false : pagination"
                  :loading="loading"
                  :locale="{ emptyText: 'Chưa có dữ liệu' }"
                  @change="handleTableChange"
                  class="ant-table-bordered">
                  <template slot="actionTitle">
                    <a-icon type="control" :style="{fontSize: '14px'}"/>
                  </template>
                  <template slot="code">
                    <span>Mã <span style="color: red"> *</span></span>
                  </template>
                  <template slot="code" slot-scope="text, record, index">
                    <a-form-model-item
                      v-if="record.editable === true"
                      ref="code"
                      :prop="'items.' + index + '.code'"
                      :rules="[
                        {
                          required: true,
                          message: 'Trường bắt buộc',
                          trigger: 'change'
                        },
                        {
                          max: 100,
                          message: 'Không nhập quá 100 ký tự',
                          trigger: 'blur'
                        }]">
                      <a-input v-model="record.code"></a-input>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.code }}
                    </template>
                  </template>
                  <template slot="name">
                    <span>Tên <span style="color: red"> *</span></span>
                  </template>
                  <template slot="name" slot-scope="text, record, index">
                    <a-form-model-item
                      v-if="record.editable === true"
                      ref="name"
                      :prop="'items.' + index + '.name'"
                      :rules="[
                        {
                          required: true,
                          message: 'Trường bắt buộc',
                          trigger: 'change'
                        },
                        {
                          max: 500,
                          message: 'Không nhập quá 500 ký tự',
                          trigger: 'blur'
                        }]">
                      <a-input v-model="record.name"></a-input>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.name }}
                    </template>
                  </template>
                  <template slot="description" slot-scope="text, record, index">
                    <a-form-model-item
                      v-if="record.editable === true"
                      ref="description"
                      :prop="'items.' + index + '.description'"
                    >
                      <a-input v-model="record.description"></a-input>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.description }}
                    </template>
                  </template>
                  <template slot="status" slot-scope="text, record">
                    <a-select v-if="record.editable === true" v-model="record.status">
                      <a-select-option value="0">Không hoạt động</a-select-option>
                      <a-select-option value="1">Hoạt động</a-select-option>
                    </a-select>
                    <template v-else>
                      {{ record.status === '1' ? 'Hoạt động' : 'Không hoạt động' }}
                    </template>
                  </template>
                  <template slot="operation" slot-scope="text, record, index">
                    <div v-if="record.editable">
                      <span @click="saveRow(record)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="save"
                          :style="{color: '#F98500',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="onDeleteRow(record.globalListId, index)" style="cursor: pointer">
                        <a-icon
                          type="delete"
                          :style="{color: '#ee0033', fontSize: '14px'}"
                        />
                      </span>
                      <span @click="cancelRow(index)" style="cursor: pointer; padding-left: 12px">
                        <a-icon
                          type="stop"
                          :style="{color: '#ee0033', fontSize: '14px'}"
                        />
                      </span>
                    </div>
                    <div v-else>
                      <span @click="showEditRow(record.globalListId)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="form"
                          :style="{color: '#ee0033',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="onDeleteRow(record.globalListId, index)" style="cursor: pointer">
                        <a-icon
                          type="delete"
                          :style="{color: '#ee0033', fontSize: '14px'}"
                        />
                      </span>
                    </div>
                  </template>
                  <GlobalValueTable slot="expandedRowRender" slot-scope="text" v-if="text.globalListId" :data-source="text"></GlobalValueTable>
                </a-table>
              </a-form-model>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>

  </main-layout>
</template>

<script>
import MainLayout from '../../layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '../../../utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import _cloneDeep from 'lodash/cloneDeep'
import { GlobalListItemDelete, GlobalListItems, GlobalListItemUpdate, GlobalListItemCreate } from '@/api/global_list'
import GlobalValueTable from './_GlobalValueTable'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    GlobalValueTable
  },
  mixins: [TableEmptyText],
  name: 'GlobalList',
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
      editedRows: [],
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
        keyword: ''
      },
      endOpen: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    formValidate () {
      return {
        items: this.data
      }
    }
  },
  methods: {
    onTrim (string) {
      return string.trim()
    },
    canCreateOrUpdate (record) {
      return true
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
      this.getData()
    },
    resetFilter () {
      this.filters = {
        keyword: ''
      }
      this.data = []
      if (this.data.length <= 0) {
        this.pagination = {
          current: 1,
          total: 1,
          pageSize: 15,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['15', '25', '50'],
          showTotal: (total) => {
            return 'Tổng số dòng ' + total
          }
        }
        this.loading = false
      }
      this.getData()
    },

    onDeleteRow (id, index) {
      this.$confirm({
        title: 'Bạn muốn xóa phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (id) {
            this.deleteGL(id)
          } else {
            const newData = [...this.data]
            newData.splice(index, 1)
            this.data = newData
          }
        },
        onCancel () {
        }
      })
    },
    deleteGL (id) {
      const $this = this
      this.loading = true
      GlobalListItemDelete({ globalListId: id })
        .then(rs => {
          $this.getData()
          this.$notification.success({
            message: 'Danh mục dùng chung',
            description: 'Xóa Danh mục thành công',
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
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    search () {
      this.pagination.current = 1
      this.getData()
    },
    getData () {
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.expandedRowKeys = []
      this.data = []
      GlobalListItems(_merge(params, this.filters)).then(res => {
        this.data = this.convertPropToDisplayDate(res.data)
        this.pagination = _merge(this.pagination, this.handlePaginationData(res))
        this.loading = false
      }).finally(res => {
        this.loading = false
      })
    },
    showEditRow (id) {
      const newData = [...this.data]
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].editable) {
          this.saveRow(newData[i])
        }
        if (newData[i].globalListId === id && this.canCreateOrUpdate(newData[i])) {
          newData[i].editable = true
          this.editedRows[newData[i].globalListId] = _cloneDeep(newData[i])
        }
      }
      this.data = newData
    },
    saveRow (record) {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          const params = {
            description: record.description,
            name: record.name,
            code: record.code,
            status: record.status
          }
          this.loading = true
          if (record.globalListId) {
            params['globalListId'] = record.globalListId
            GlobalListItemUpdate(params)
              .then(rs => {
                const newData = [...this.data]
                for (let i = 0; i < newData.length; i++) {
                  if (newData[i].globalListId === record.globalListId) {
                    delete newData[i].editable
                  }
                }
                this.data = newData
                this.$notification.success({
                  message: 'Danh mục dùng chung',
                  description: 'Cập nhật thành công',
                  duration: 5
                })
              })
              .catch(err => {
                const msg = this.handleApiError(err)
                this.$notification.error({
                  message: 'Cập nhật không thành công',
                  description: msg,
                  duration: 5
                })
              }).finally(res => {
                this.loading = false
              })
          } else {
            params['globalListId'] = null
            GlobalListItemCreate(params)
              .then(rs => {
                this.getData()
                this.$notification.success({
                  message: 'Danh mục dùng chung',
                  description: 'Bạn vừa tạo mới cấu hình ' + params.name,
                  duration: 5
                })
              })
              .catch(err => {
                const msg = this.handleApiError(err)
                this.$notification.error({
                  message: 'Thêm mới không thành công',
                  description: msg,
                  duration: 5
                })
              }).finally(res => {
                this.loading = false
              })
          }
        }
      })
    },
    cancelRow (index) {
      const newData = [...this.data]
      newData[index] = this.editedRows[newData[index].globalListId]
      delete newData[index].editable
      this.data = newData
    },
    appendRowEmpty (numberRow) {
      const { data } = this
      if (data.length + numberRow > this.pagination.pageSize) {
        data.splice(this.pagination.pageSize - numberRow, numberRow)
      }
      for (let i = 0; i < numberRow; i++) {
        const newData = {
          description: '',
          globalListId: null,
          name: '',
          code: '',
          status: '1',
          editable: true,
          values: []
        }
        this.data = [newData, ...data]
        this.expandedRowKeys = []
      }
    },
    addRow () {
      this.appendRowEmpty(1)
    }
  }
}
</script>
<style>
  .ant-table-row .ant-form-item {
    margin-bottom: 0 !important;
  }
</style>
