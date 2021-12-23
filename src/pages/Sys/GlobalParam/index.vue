<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Tham số hệ thống</a-breadcrumb-item>
      </a-breadcrumb>
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
              <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm
              </a-button>
              <a-button class="btn-reset uppercase" style="margin-left: 1rem" @click="resetFilter">Nhập lại</a-button>
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
              <a-button v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI')" class="ant-btn ant-btn-primary" @click="addRow"> <a-icon type="plus-circle"/> Thêm mới </a-button>
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
                          trigger: 'blur'
                        },
                        {
                          max: 50,
                          message: 'Không nhập quá 50 ký tự',
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
                          trigger: 'blur'
                        },
                        {
                          max: 400,
                          message: 'Không nhập quá 400 ký tự',
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
                      :rules="[
                        {
                          required: false,
                          message: 'Trường bắt buộc',
                          trigger: 'blur'
                        },
                        {
                          max: 3000,
                          message: 'Không nhập quá 3000 ký tự',
                          trigger: 'blur'
                        }]">
                      <a-input v-model="record.description"></a-input>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.description }}
                    </template>
                  </template>
                  <template slot="value">
                    <span>Giá trị <span style="color: red"> *</span></span>
                  </template>
                  <template slot="value" slot-scope="text, record, index">
                    <a-form-model-item
                      v-if="record.editable === true"
                      ref="value"
                      :prop="'items.' + index + '.value'"
                      :rules="[
                        {
                          required: true,
                          message: 'Trường bắt buộc',
                          trigger: 'blur'
                        },
                        {
                          max: 200,
                          message: 'Không nhập quá 200 ký tự',
                          trigger: 'blur'
                        }]">
                      <a-input v-model="record.value"></a-input>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.value }}
                    </template>
                  </template>
                  <template slot="status" slot-scope="text, record, index">
                    <a-form-model-item
                      v-if="record.editable === true"
                      ref="status"
                      :prop="'items.' + index + '.status'"
                      :rules="{
                        required: true,
                        message: 'Trường bắt buộc',
                        trigger: 'blur'
                      }">
                      <a-select v-model="record.status">
                        <a-select-option value="0">Không hoạt động</a-select-option>
                        <a-select-option value="1">Hoạt động</a-select-option>
                      </a-select>
                    </a-form-model-item>
                    <template v-else>
                      {{ record.status === '1' ? 'Hoạt động' : 'Không hoạt động' }}
                    </template>
                  </template>
                  <template slot="operation" slot-scope="text, record, index">
                    <div v-if="record.editable === true">
                      <span @click="saveRow(record)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="save"
                          :style="{color: '#F98500',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="onChangeRow(index, record)" style="cursor: pointer">
                        <a-icon
                          type="delete"
                          :style="{color: '#F98500', fontSize: '14px'}"
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
                      <span v-if="canCreateOrUpdate(record)" @click="showEditRow(record.globalParamId)" style="padding-right:12px;cursor: pointer">
                        <a-icon
                          type="form"
                          :style="{color: '#ee0033',fontSize: '14px'}"
                        />
                      </span>
                      <span @click="onDeleteRow(record.globalParamId, index)" style="cursor: pointer">
                        <a-icon
                          type="delete"
                          :style="{color: '#ee0033', fontSize: '14px'}"
                        />
                      </span>
                    </div>
                  </template>
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
import _merge from 'lodash/merge'
import TableEmptyText from '@/utils/table-empty-text'
import { GlobalParamItemChangeStatus, GlobalParamItemUpdate, GlobalParamItemCreate, GlobalParamItems, GlobalParamItemDelete } from '@/api/global_param'
import columns from './columns'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  components: {
    MainLayout

  },
  mixins: [TableEmptyText],
  name: 'GlobalParam',
  data () {
    return {
      activeSearchKey: 1,
      activeResultKey: 1,
      data: [],
      expandedRowKeys: [],
      editedRows: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
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
      endOpen: false,
      products: [],
      lastFetchId: 0,
      fetching: false
    }
  },

  async created () {
    this.getData()
    this.data = []
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
    expandRow (expand, record) {
      if (expand) {
        this.expandedRowKeys = [...this.expandedRowKeys, record.rowKey]
      } else {
        this.expandedRowKeys = this.expandedRowKeys.filter(rowKey => rowKey !== record.rowKey)
      }
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
      GlobalParamItems(_merge(params, this.filters)).then(res => {
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

    rowKey (record, index) {
      return index
    },
    reloadData () {
      this.getData()
    },
    resetFilter () {
      this.filters = {
        keyword: ''
      }
      this.data = []
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
      this.getData()
    },
    appendRowEmpty (numberRow) {
      const { data } = this
      if (data.length + numberRow > this.pagination.pageSize) {
        data.splice(this.pagination.pageSize - numberRow, numberRow)
      }
      for (let i = 0; i < numberRow; i++) {
        const newData = {
          globalParamId: null,
          description: '',
          name: '',
          code: '',
          status: '1',
          createUser: 'SYSTEM',
          editable: true
        }
        this.data = [newData, ...data]
      }
    },
    addRow () {
      this.appendRowEmpty(1)
    },
    onChangeRow (index, record) {
      this.$confirm({
        title: 'Bạn muốn thay đổi phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          const data = [...this.data]
          const newData = []
          for (let i = 0; i < data.length; i++) {
            if (i !== index) {
              newData.push(data[i])
            } else if (data[i].globalParamId) {
              this.changeStatus(record)
            }
          }
          this.data = newData
        }
      })
    },

    changeStatus (record) {
      this.loading = true
      const params = { status: '3', globalParamId: record.globalParamId }
      GlobalParamItemChangeStatus(params).then(res => {
        this.getData()
        this.$notification.success({
          message: 'Tham số hệ thống',
          description:
            'Thay đổi cài đặt thành công',
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
    onDeleteRow (id, index) {
      this.$confirm({
        title: 'Bạn muốn xóa phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (id) {
            this.deleteParam(id)
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
    deleteParam (globalParamId) {
      this.loading = true
      GlobalParamItemDelete({ globalParamId: globalParamId }).then(res => {
        this.getData()
        this.$notification.success({
          message: 'Tham số hệ thống',
          description:
            'Xóa cài đặt thành công',
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
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    showEditRow (globalParamId) {
      const newData = [...this.data]
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].editable) {
          this.saveRow(newData[i])
        }
        if (newData[i].globalParamId === globalParamId && this.canCreateOrUpdate(newData[i])) {
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
            globalParamId: record.globalParamId,
            name: record.name,
            code: record.code,
            status: record.status,
            type: record.type,
            value: record.value
          }
          this.loading = true
          if (record.globalParamId) {
            params['updateUser'] = 'SYSTEM'
            GlobalParamItemUpdate(params)
              .then(rs => {
                const newData = [...this.data]
                for (let i = 0; i < newData.length; i++) {
                  if (newData[i].globalParamId === record.globalParamId) {
                    delete newData[i].editable
                  }
                }
                this.data = newData
                this.$notification.success({
                  message: 'Tham số hệ thống',
                  description: 'Cập nhật thành công',
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
          } else {
            params['createUser'] = 'SYSTEM'
            GlobalParamItemCreate(params)
              .then(rs => {
                this.getData()
                this.$notification.success({
                  message: 'Tham số hệ thống',
                  description: 'Bạn vừa tạo mới cấu hình ' + params.name,
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
            this.getData()
          }
        }
      })
    },
    cancelRow (index) {
      const newData = [...this.data]
      newData[index] = this.editedRows[newData[index].globalListId]
      delete newData[index].editable
      this.data = newData
    }
  }
}
</script>
