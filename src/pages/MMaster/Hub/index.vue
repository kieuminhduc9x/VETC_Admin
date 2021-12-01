<template>
  <main-layout>

    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item><a href="/">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item :class="'active'">Danh mục Hub</a-breadcrumb-item>
      </a-breadcrumb>

    </template>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      :rules="rules"
      @submit="search"
      layout="vertical">
      <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left">
        <a-collapse-panel header="Tìm kiếm Hub" key="1">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item prop="hubName" label="Tên Hub">
                  <a-input v-model="filters.hubName"/>
                </a-form-model-item>
              </a-col>
              <a-col
                :xs="24"
                :md="6"
                :lg="6"
                class="filter-item-container"
                style=" margin-top: 21.5px; justify-content: center">
                <a-button type="primary" class="btn-success uppercase" @click="search">Tìm kiếm
                </a-button>
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-left: 1rem">
                  Nhập lại
                </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
      <a-collapse-panel header="Danh mục Hub" key="1">
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
                    <span @click="onEditRow(record)" class="vna-link">Sửa</span>

                    <span
                      @click="onDeleteRow(record)"
                      class="vna-link"
                      style="padding-left:12px;cursor: pointer">
                      Xóa
                    </span>
                  </div>
                </template>
                <ListUser slot="expandedRowRender" slot-scope="text" v-if="text.hubId" :hub-object="text"></ListUser>

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
      <hub-form
        v-if="modalSync"
        :is-editable="modalIsEdit"
        :is-view="false"
        :is-create="modalIsCreate"
        @closeModal="handleCancelModal"
        :hubData="modalHubEdit"></hub-form>

    </a-modal>

  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayout'
import resizeableTitle from '@/utils/resizable-columns'
import TableEmptyText from '@/utils/table-empty-text'
import columns from './columns'
import _merge from 'lodash/merge'
import { DeleteHub, SearchByHubName } from '@/api/hub'
import Form from './Form'
import ListUser from './_List_User'

const ResizeableTitle = resizeableTitle(columns)
export default {
  components: {
    MainLayout,
    HubForm: Form,
    ListUser
  },
  mixins: [TableEmptyText],
  name: 'MasterHub',
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
      modalHubEdit: {},
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
        hubName: ''
      },
      rules: {},
      endOpen: false,
      visible: false,
      confirmLoading: false
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
    onDetailRow (record) {
      this.$router.push({ name: 'order_detail', params: { id: 1 } })
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
      const params = {
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      this.data = []
      SearchByHubName(_merge(params, this.filters)).then(res => {
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
    addNew () {
      this.modalTitle = 'Thêm mới Hub'
      this.modalIsCreate = true
      this.modalIsEdit = false
      this.modalSync = true
    },
    onEditRow (record) {
      this.modalHubEdit = record
      this.modalTitle = 'Cập nhật Hub'
      this.modalIsCreate = false
      this.modalIsEdit = true
      this.modalSync = true
    },
    onDeleteRow (record, index) {
      this.$confirm({
        title: 'Bạn có muốn xóa Hub này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          this.deleteRow(record.hubId)
        },
        onCancel () {
        }
      })
    },
    deleteRow (id) {
      const $this = this
      this.loading = true
      DeleteHub({ hubId: id })
        .then(rs => {
          this.$notification.success({
            message: 'Xóa Hub',
            description:
            'Xóa Hub thành công',
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
    }

  }
}
</script>
